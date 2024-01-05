from fastapi import FastAPI, File, UploadFile
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import preprocess_input
import numpy as np

# Load your pre-trained model
model = load_model('Model/dog_breed_model.h5')  # Replace with your model file path

# Define the class labels used during training
class_labels = ['Afghan','Border Collie','Corgi', 'Coyote','Doberman', 'German Sheperd', 'Labradoodle','Maltese', 'Pomeranian','Pug','Rottweiler', 'Saint Bernard','Shiba Inu','Shih-Tzu', 'Siberian Husky']

app = FastAPI()

@app.post("/classify")
async def classify_image(file: UploadFile = File(...)):
    # Load and preprocess the image
    contents = await file.read()
    img = image.load_img(contents, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    # Make predictions with the loaded model
    predictions = model.predict(img_array)

    # Decode predictions manually
    decoded_predictions = [(class_labels[i], predictions[0][i]) for i in range(len(class_labels))]

    # Sort predictions by score in descending order
    decoded_predictions.sort(key=lambda x: x[1], reverse=True)

    # Return the top prediction
    top_prediction = {'label': decoded_predictions[0][0], 'score': float(decoded_predictions[0][1])}
    return {'predictions': [top_prediction]}
