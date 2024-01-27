from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse, JSONResponse, ORJSONResponse

from fastapi import  File, UploadFile,APIRouter
import os
import shutil
import mmh3
from werkzeug.utils import secure_filename

from models.ml_model import get_prediction,get_predictions_VIT
from utils.data_retrieval import get_breed_info, get_all_breeds,get_all_breeds_and_image,get_all_breed_info

router = APIRouter()
img_path = 'imgs/'

@router.get("/", tags=["Info"])
def redirect_to_docs():
    return RedirectResponse(url="/docs", status_code=302)


@router.get("/version", tags=["Info"])
async def get_version_endpoint():
    """Returns the current version of the API."""
    return {"version": '1.1'}  # Assuming version is stored in model_config


@router.post("/classify", tags=["Dogs"])
async def classify_image_endpoint(file: UploadFile = File(...)):
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

    prediction = get_predictions_VIT(file_path, new_path)
    print(prediction)
    return JSONResponse(prediction)

@router.get("/get_dog_info", tags=["Dogs"])
async def get_dog_info_endpoint(breed: str):
    breed_info = get_breed_info(breed)
    return breed_info

@router.get("/get_all_breeds", tags=["Dogs"])
async def get_all_breeds_endpoint():
    breeds = get_all_breeds()
    return breeds

@router.get("/get_all_breeds_with_images", tags=["Dogs"])
async def get_all_breeds_with_images_endpoint():
    breeds = get_all_breeds_and_image()
    return breeds

@router.get("/get_all_breed_info", tags=["Dogs"])
async def get_all_breed_info_endpoint():
    breeds = get_all_breed_info()
    return breeds