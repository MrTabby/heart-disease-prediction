from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pandas as pd
import joblib


model = joblib.load("Model/rf_heart_model.pkl")

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HeartData(BaseModel):
    age: int = Field(..., ge=1, le=120)
    sex: int = Field(..., ge=0, le=1)
    cp: int = Field(..., ge=0, le=3)
    trestbps: int = Field(..., ge=50, le=300)
    chol: int = Field(..., ge=50, le=600)
    fbs: int = Field(..., ge=0, le=1)
    restecg: int = Field(..., ge=0, le=2)
    thalach: int = Field(..., ge=50, le=250)
    exang: int = Field(..., ge=0, le=1)
    oldpeak: float = Field(..., ge=0, le=10)
    slope: int = Field(..., ge=0, le=2)
    ca: int = Field(..., ge=0, le=3)
    thal: int = Field(..., ge=1, le=3)

@app.get("/")
def home():
    return {"message": "Heart Disease Prediction API Running"}

@app.post("/predict")
def predict(data: HeartData):
    try:
        
        input_data = pd.DataFrame([{
    "age": data.age,
    "sex": data.sex,
    "cp": data.cp,
    "trestbps": data.trestbps,
    "chol": data.chol,
    "fbs": data.fbs,
    "restecg": data.restecg,
    "thalach": data.thalach,
    "exang": data.exang,
    "oldpeak": data.oldpeak,
    "slope": data.slope,
    "ca": data.ca,
    "thal": data.thal
    }])

        
        prediction = model.predict(input_data)[0]
        

        
        if prediction == 1:
            
            result_text = "Heart Disease Detected"
        else:
            
            result_text = "No Heart Disease"

        return {
            "prediction": int(prediction),
            "result": result_text,
            
        }

    except Exception as e:
        return {"error": str(e)}