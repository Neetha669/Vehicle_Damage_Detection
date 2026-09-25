from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI-Based Vehicle Damage Detection")

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI-Based Vehicle Damage Detection API is running"
    }


@app.post("/upload")
async def upload_vehicle(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "message": "Vehicle file uploaded successfully"
    }