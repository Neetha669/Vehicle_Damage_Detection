from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from inference_sdk import InferenceHTTPClient
import os

load_dotenv()

ROBOFLOW_API_KEY = os.getenv("ROBOFLOW_API_KEY")
ROBOFLOW_MODEL_ID = os.getenv("ROBOFLOW_MODEL_ID")

app = FastAPI(title="Vehicle Damage Detection")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key=ROBOFLOW_API_KEY
)


@app.get("/")
def home():
    return {
        "message": "Vehicle Damage Detection API is running"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    image = await file.read()

    # Save uploaded image temporarily
    temp_file = "temp_image.jpg"

    with open(temp_file, "wb") as f:
        f.write(image)

    try:
        result = client.infer(
            temp_file,
            model_id=ROBOFLOW_MODEL_ID
        )

        return {
            "filename": file.filename,
            "prediction": result
        }

    except Exception as e:

        return {
            "error": str(e)
        }

    finally:

        if os.path.exists(temp_file):
            os.remove(temp_file)