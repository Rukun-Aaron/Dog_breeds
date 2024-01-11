import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from config import Settings
from api.routers import dog_breed_router
import atexit
from utils.image_processing import cleanup_images
# Load configuration settings
# settings = Settings()

# Create the FastAPI app instance
app = FastAPI()

# Include API routers
app.include_router(dog_breed_router.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
atexit.register(cleanup_images)
# Add any other middleware or dependencies

if __name__ == "__main__":
    # Run the app with Uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)  # Adjust host and port as needed
