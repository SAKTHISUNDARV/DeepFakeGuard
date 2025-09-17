from fastapi import FastAPI, UploadFile, File
import shutil
import os
from services.predictor import predict_image, predict_video

# adjust this import based on where you run uvicorn

app = FastAPI()

# Root route
@app.get("/")
def root():
    return {"message": "DeepFakeGuard API is running 🚀"}

@app.post("/predict/image")
async def predict_image_endpoint(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = {}
    try:
        if file.filename.lower().endswith((".jpg", ".jpeg", ".png")):
            result = predict_image(temp_path)
        else:
            result = {"status": "error", "message": "Unsupported image format"}
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

    return result

@app.post("/predict/video")
async def predict_video_endpoint(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = {}
    try:
        if file.filename.lower().endswith((".mp4", ".avi", ".mov", ".gif")):
            result = predict_video(temp_path)
        else:
            result = {"status": "error", "message": "Unsupported video format"}
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

    return result
