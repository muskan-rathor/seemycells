# 🧬 SeeMyCells – AI Blood Cell Detection Web App

[![GitHub repo stars](https://img.shields.io/github/stars/muskan-rathor/seemycells?style=social)](https://github.com/muskan-rathor/seemycells)

An AI-powered full-stack web application to detect and count RBCs, WBCs, and platelets from blood smear images using YOLOv8 and a React-based frontend.

🔗 **Live Demo:** [seemycells.vercel.app](https://seemycells.vercel.app)

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

| Layer       | Tech Used                              |
|-------------|-----------------------------------------|
| Frontend    | React 19 + Vite, CSS                    |
| Backend     | Flask + Python, Gunicorn                |
| AI Model    | YOLOv8 (Ultralytics)                    |
| File Upload | FormData + Flask-CORS                   |
| Charts/PDF  | Recharts, html2canvas, jsPDF            |
| Deployment  | Vercel (frontend), Render (backend)     |

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
```

### 2️⃣ Set Up the Backend (Flask + YOLOv8)

Navigate to the backend folder:

```bash
cd ml_back
pip install -r requirements.txt
python ml.py
```

### 3️⃣ Set Up the Frontend (React)

Open a new terminal and navigate to the frontend folder:

```bash
cd seemycells_frontend
npm install
npm run dev
```

Create a `.env` file in `seemycells_frontend/` (see `.env.example`) pointing `VITE_API_URL` at your local backend, e.g.:

```
VITE_API_URL=http://localhost:5000
```

---

## ✅ Usage

1. Open http://localhost:5173 in your browser
2. Enter a patient name
3. Upload a JPG/PNG blood smear image (Max 5MB)
4. Click "Analyze Image"
5. View detection results (RBC, WBC, Platelets)

---

## ✨ Credits

Made with 💙 by Muskan Rathore
