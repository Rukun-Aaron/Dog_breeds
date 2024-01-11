from fastapi import FastAPI, File, UploadFile,APIRouter, Query
from fastapi.responses import RedirectResponse, JSONResponse, ORJSONResponse
from fastapi.middleware.cors import CORSMiddleware
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename
from fastapi.responses import JSONResponse
import numpy as np
import os
import shutil
import mmh3
import atexit
from library.utilities.utilities import get_prediction, cleanup_images, is_file_allowed, get_prediction2
# uvicorn main:app --reload
# uvicorn asgi:app --reload --port 6789

utils_api = APIRouter(tags=["Utilities"])

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
# model = load_model('Model/dog_breed_inception_model_20(4).h5')  # Replace with your model file path

# Define the class labels used during training



# Register cleanup function to be called on shutdown
atexit.register(cleanup_images)

img_path = 'images/'
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

    prediction = get_prediction(file_path, new_path)
    print(prediction)
    return JSONResponse(prediction)


@app.post('/classify2', responses={200:{"description": "Success"}, 400:{"description": "Bad Request"}, 405:{"description": "Method Not Allowed"}, 500:{"description": "Internal Server Error"}}, tags=["Utilities"])
def classify_image2(files: list[UploadFile]):
    
    try:
        returnList= []
        for file in files:

            if not is_file_allowed(file.filename):
                return ORJSONResponse(content={"message": "File type not allowed"}, status_code=405)
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

            prediction = get_prediction2(file_path, new_path)

            returnList.append({"name": file.filename, "prediction": prediction, "hash": hash_value})
        print(returnList)
        return JSONResponse(content=returnList)

    except Exception as e:
            return ORJSONResponse(content={"error": "Internal Server Error"}, status_code=500)
