from fastapi import FastAPI, File, UploadFile
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from fastapi.responses import JSONResponse
import numpy as np
import os
import shutil
import mmh3
import atexit
# uvicorn main:app --reload
app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your pre-trained model
model = load_model('Model/dog_breed_inception_model_20(4).h5')  # Replace with your model file path

# Define the class labels used during training
class_labels = ['Afghan', 'Basset', 'Beagle', 'Border Collie', 'Corgi', 'Coyote', 'Doberman', 'German Sheperd',
                'Labradoodle', 'Maltese', 'Newfoundland', 'Pit Bull', 'Pomeranian', 'Poodle', 'Pug', 'Rottweiler',
                'Saint Bernard', 'Shiba Inu', 'Shih-Tzu', 'Siberian Husky']

img_path = 'images/'


def load_and_preprocess_image(img_path_input):
    img = image.load_img(img_path_input, target_size=(299, 299))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize the image
    return img_array


def get_prediction(file_path, new_path, model):
    img_array = load_and_preprocess_image(new_path)
    predictions = model.predict(img_array)

    # Decode predictions manually
    decoded_predictions = [(class_labels[i], predictions[0][i]) for i in range(len(class_labels))]

    # Sort predictions by score in descending order
    decoded_predictions.sort(key=lambda x: x[1], reverse=True)

    # Return the top prediction
    top_prediction = {'label': decoded_predictions[0][0], 'score': float(decoded_predictions[0][1])}
    return {'predictions': [top_prediction]}


def cleanup_images():
    # Delete all images from the images folder
    for filename in os.listdir(img_path):
        file_path = os.path.join(img_path, filename)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(f"Error deleting {filename}: {e}")


# Register cleanup function to be called on shutdown
atexit.register(cleanup_images)


@app.get("/")
def redirect_to_docs():
    return RedirectResponse(url="/docs", status_code=302)


@app.get("/version")
def read_version():
    return {"Version": "1.0"}


@app.post("/classify")
async def classify_image(file: UploadFile = File(...)):
    file_path = os.path.join(img_path, secure_filename(file.filename))
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with open(file_path, "rb") as buffer:
        hash_value = mmh3.hash(buffer.read())
    file_ext = os.path.splitext(file_path)[1]
    filename_without_ext = os.path.splitext(secure_filename(file.filename))[0]
    new_path = os.path.join(img_path, f"{filename_without_ext}.{str(hash_value)}{file_ext}")

    if not os.path.isfile(new_path):
        os.rename(file_path, new_path)

    prediction = get_prediction(file_path, new_path, model)
    print(prediction)
    return prediction
