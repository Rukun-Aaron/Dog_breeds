from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse, JSONResponse, ORJSONResponse

from fastapi import  File, UploadFile,APIRouter
import os
import shutil
import mmh3
from werkzeug.utils import secure_filename

from models.ml_model import get_prediction, get_predictions_VIT

router = APIRouter()
img_path = 'imgs/'

@router.get("/")
def redirect_to_docs():
    return RedirectResponse(url="/docs", status_code=302)


@router.get("/version", tags=["Info"])
async def get_version():
    """Returns the current version of the API."""
    return {"version": '1.1'}  # Assuming version is stored in model_config


@router.post("/classify")
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

    prediction = get_predictions_VIT(file_path, new_path)
    print(prediction)
    return JSONResponse(prediction)