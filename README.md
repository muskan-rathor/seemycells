# 🧬 SeeMyCells – AI Blood Cell Detection Web App

[![GitHub repo stars](https://img.shields.io/github/stars/muskan-rathor/seemycells?style=social)](https://github.com/muskan-rathor/seemycells)

An AI-powered full-stack web application to detect and count RBCs, WBCs, and platelets from blood smear images using YOLOv8 and a React-based frontend.

---

## 🚀 Features

- 🧠 Real-time AI-based detection  
- 📷 Drag-and-drop image upload  
- 🔍 RBC, WBC, Platelet count detection  
- 👩‍⚕️ Patient name input and history-ready UI  
- ⚡ Fast inference with YOLOv8  
- 🎨 Clean, responsive React UI  

---

## 🛠 Tech Stack

| Layer       | Tech Used                      |
|-------------|--------------------------------|
| Frontend    | React + Tailwind CSS           |
| Backend     | Flask + Python                 |
| AI Model    | YOLOv8 (Ultralytics)           |
| File Upload | FormData + Flask CORS          |
| Others      | React Router, Icons, Spinners  |

---



---

## 🧪 How to Run This Project

### ⚙️ Prerequisites

- Python 3.8+
- Node.js and npm
- Git
- pip (Python package manager)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/muskan-rathor/seemycells.git
cd seemycells



2️⃣ Set Up the Backend (Flask + YOLOv8)
Navigate to the backend folder:

cd ml_back

pip install -r requirements.txt
pip install flask flask-cors ultralytics opencv-python


python ml.py



3️⃣ Set Up the Frontend (React)
Open a new terminal and navigate to the frontend folder:


cd seemycells_frontend
npm install

npm run dev



✅ Usage
Open http://localhost:5173 in your browser

Enter a patient name

Upload a JPG/PNG blood smear image (Max 5MB)

Click “Analyze Image”

View detection results (RBC, WBC, Platelets)

✨ Credits
Made with 💙 by Muskan Rathore