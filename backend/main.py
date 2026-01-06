from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import uvicorn

app = FastAPI(title="Chili Nutrient Deficiency Detection API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
MODEL_PATH = "../chilli_nutrient_model.keras"
model = None

# Class labels
CLASS_LABELS = ['Calcium', 'healthy', 'Magnesium', 'Nitrogen', 'Phosphorus', 'Potassium']

# Recommendation data
RECOMMENDATIONS = {
    "Nitrogen": {
        "symptoms": "Pale-yellow leaves",
        "organic_fertilizer": "Banana peel, tea compost",
        "form": "Liquid/Powder",
        "dosage_per_plant": "50-100 ml / 1-2 tbsp",
        "sunlight_requirement": "6-8 hours direct sunlight",
        "humidity_requirement": "50-70%",
        "severity": "moderate",
        "color": "yellow"
    },
    "Phosphorus": {
        "symptoms": "Dark green/ purple leaves",
        "organic_fertilizer": "Bone meal, Banana peel powder",
        "form": "Powder",
        "dosage_per_plant": "1 tbsp",
        "sunlight_requirement": "6-8 hours",
        "humidity_requirement": "45-60%",
        "severity": "moderate",
        "color": "purple"
    },
    "Potassium": {
        "symptoms": "Brown leaf edges, curling",
        "organic_fertilizer": "Banana peel tea, wood ash",
        "form": "Liquid/Powder",
        "dosage_per_plant": "70-100 ml / 1 tsp ash",
        "sunlight_requirement": "6-8 hours",
        "humidity_requirement": "50-70%",
        "severity": "moderate",
        "color": "orange"
    },
    "Calcium": {
        "symptoms": "Blossom-end rot",
        "organic_fertilizer": "Eggshell",
        "form": "Liquid/Powder",
        "dosage_per_plant": "1 tsp / 50 ml",
        "sunlight_requirement": "5-7 hours sunlight",
        "humidity_requirement": "50-60%",
        "severity": "high",
        "color": "red"
    },
    "Magnesium": {
        "symptoms": "Yellow leaf veins",
        "organic_fertilizer": "Green leaf compost",
        "form": "Powder/ soil mix",
        "dosage_per_plant": "1/2 - 1 cup per plant mixed into soil, every 2 weeks",
        "sunlight_requirement": "6-8 hours",
        "humidity_requirement": "40-60%",
        "severity": "moderate",
        "color": "yellow"
    },
    "Iron": {
        "symptoms": "Yellow young leaves",
        "organic_fertilizer": "Compost tea",
        "form": "Liquid",
        "dosage_per_plant": "40-60 ml",
        "sunlight_requirement": "5-7 hours",
        "humidity_requirement": "50-70%",
        "severity": "moderate",
        "color": "yellow"
    },
    "healthy": {
        "symptoms": "No deficiency detected",
        "organic_fertilizer": "Continue regular fertilization schedule",
        "form": "As per routine",
        "dosage_per_plant": "Maintain current dosage",
        "sunlight_requirement": "6-8 hours",
        "humidity_requirement": "50-70%",
        "severity": "none",
        "color": "green"
    }
}

@app.on_event("startup")
async def load_model():
    global model
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        print("Model loaded successfully!")
    except Exception as e:
        print(f"Error loading model: {e}")

@app.get("/")
async def root():
    return {"message": "Chili Nutrient Deficiency Detection API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

def preprocess_image(image: Image.Image, target_size=(224, 224)):
    """Preprocess the image for model prediction"""
    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Resize image
    image = image.resize(target_size)
    
    # Convert to array and normalize
    img_array = np.array(image)
    img_array = img_array / 255.0  # Normalize to [0,1]
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

@app.post("/predict")
async def predict_deficiency(file: UploadFile = File(...)):
    """
    Predict nutrient deficiency from uploaded image
    """
    if model is None:
        return JSONResponse(
            status_code=503,
            content={"error": "Model not loaded"}
        )
    
    try:
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Preprocess image
        processed_image = preprocess_image(image)
        
        # Make prediction
        predictions = model.predict(processed_image)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx])
        
        # Get predicted class name
        predicted_class = CLASS_LABELS[predicted_class_idx]
        
        # Get all class probabilities
        class_probabilities = {
            CLASS_LABELS[i]: float(predictions[0][i])
            for i in range(len(CLASS_LABELS))
        }
        
        # Get recommendation
        recommendation = RECOMMENDATIONS.get(predicted_class, RECOMMENDATIONS["healthy"])
        
        return {
            "success": True,
            "prediction": predicted_class,
            "confidence": confidence,
            "class_probabilities": class_probabilities,
            "recommendation": recommendation
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.get("/recommendations")
async def get_all_recommendations():
    """Get all available recommendations"""
    return {
        "success": True,
        "recommendations": RECOMMENDATIONS
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
