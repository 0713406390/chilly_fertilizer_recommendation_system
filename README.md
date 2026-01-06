# 🌶️ Chili Plant Nutrient Deficiency Detection System

A full-stack application that uses machine learning to detect nutrient deficiencies in chili plants and provides organic fertilizer recommendations.

## 🚀 Features

- **Image-based Detection**: Upload a photo of your chili plant to detect nutrient deficiencies
- **6 Deficiency Types**: Detects Nitrogen, Phosphorus, Potassium, Calcium, Magnesium, and Iron deficiencies
- **Organic Recommendations**: Get specific organic fertilizer recommendations with dosage
- **Environmental Guidelines**: Sunlight and humidity requirements for optimal plant health
- **Modern UI**: Beautiful, responsive interface built with React and Chakra UI
- **Real-time Analysis**: Fast predictions powered by TensorFlow/Keras

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## 🛠️ Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install Python dependencies:
```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

## 🏃‍♂️ Running the Application

### Start the Backend Server

1. Make sure you're in the backend directory with the virtual environment activated
2. Run the FastAPI server:
```bash
python main.py
```

The backend will start at `http://localhost:8000`

You can verify it's running by visiting `http://localhost:8000` in your browser.

### Start the Frontend Application

1. Open a new terminal and navigate to the frontend directory
2. Start the React development server:
```bash
npm start
```

The frontend will start at `http://localhost:3000` and automatically open in your browser.

## 📸 How to Use

1. Open your browser and go to `http://localhost:3000`
2. Click on the upload area or "Select Image" button
3. Choose a photo of your chili plant
4. Click "Analyze Plant" to get the diagnosis
5. View the results with detailed recommendations

## 🔍 API Endpoints

### GET `/`
Health check endpoint
- Returns: Basic API information

### GET `/health`
Check if the model is loaded
- Returns: Health status and model status

### POST `/predict`
Analyze plant image for nutrient deficiency
- Input: Image file (multipart/form-data)
- Returns: Prediction, confidence, and recommendations

### GET `/recommendations`
Get all available recommendations
- Returns: Complete list of all nutrient deficiency recommendations

## 🌱 Nutrient Deficiencies Detected

1. **Nitrogen**: Pale-yellow leaves
2. **Phosphorus**: Dark green/purple leaves
3. **Potassium**: Brown leaf edges, curling
4. **Calcium**: Blossom-end rot
5. **Magnesium**: Yellow leaf veins
6. **Iron**: Yellow young leaves
7. **Healthy**: No deficiency detected

## 🎨 Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **TensorFlow/Keras**: Deep learning model
- **Pillow**: Image processing
- **Uvicorn**: ASGI server

### Frontend
- **React**: UI library
- **Chakra UI**: Component library
- **Axios**: HTTP client
- **React Icons**: Icon library

## 📁 Project Structure

```
Chilly Plantation/
├── backend/
│   ├── main.py                 # FastAPI application
│   └── requirements.txt        # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ImageUploader.js    # Image upload component
│   │   │   └── ResultDisplay.js     # Results display component
│   │   ├── App.js              # Main app component
│   │   ├── index.js            # Entry point
│   │   └── theme.js            # Chakra UI theme
│   └── package.json            # Node dependencies
├── chilli_nutrient_model.keras # Trained model
└── README.md
```

## 🔧 Troubleshooting

### Backend Issues

1. **Model not loading**: Ensure `chilli_nutrient_model.keras` is in the root directory
2. **Port already in use**: Change the port in `main.py` (line at the bottom)
3. **Import errors**: Make sure all dependencies are installed with `pip install -r requirements.txt`

### Frontend Issues

1. **Cannot connect to backend**: Ensure the backend is running at `http://localhost:8000`
2. **Port already in use**: React will automatically suggest a different port
3. **CORS errors**: Check that CORS middleware is properly configured in the backend

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📝 License

This project is for educational purposes.

## 👥 Author

Developed with ❤️ for better chili plant care

---

**Note**: Make sure both the backend and frontend are running simultaneously for the application to work properly.
