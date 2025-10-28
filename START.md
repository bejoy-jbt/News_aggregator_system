# 🚀 How to Start Backend and Frontend Separately (Without Docker)

## Prerequisites

1. **Python 3.10+** installed
2. **MongoDB** running locally (or using Docker just for MongoDB)
3. **Web browser**

---

## Step 1: Start MongoDB

**Option A: Using Docker (Recommended)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

**Option B: Installed MongoDB**
```bash
mongod
```

---

## Step 2: Start Backend

Open a **new terminal** window:

```bash
# Navigate to backend directory
cd backend

# Activate virtual environment (if you have one)
# venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies (if not already installed)
pip install -r requirements.txt

# Start the backend server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Or use the run script:
```bash
cd backend
python app/run.py
```

**Backend will be running at:** http://localhost:8000

---

## Step 3: Start Frontend

Open **another new terminal** window:

**Option 1: Python HTTP Server (Simplest)**
```bash
cd frontend
python -m http.server 3000
```

**Option 2: Using Node.js (if you have it)**
```bash
cd frontend
npx http-server -p 3000
```

**Option 3: VS Code Live Server (Recommended)**
- Right-click `frontend/index.html`
- Select "Open with Live Server"

**Frontend will be running at:** http://localhost:3000

---

## Quick Start Commands

### Windows (PowerShell)

**Terminal 1 - Backend:**
```powershell
cd backend
python -m uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
python -m http.server 3000
```

### Linux/Mac

**Terminal 1 - Backend:**
```bash
cd backend
python3 -m uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
python3 -m http.server 3000
```

---

## Access Your Application

- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/api/health

---

## Environment Variables (Optional)

If you need to set API keys:

**Windows:**
```powershell
$env:NEWSAPI_KEY="your_key"
$env:GUARDIAN_KEY="your_key"
```

**Linux/Mac:**
```bash
export NEWSAPI_KEY="your_key"
export GUARDIAN_KEY="your_key"
```

---

## Troubleshooting

**Backend won't start?**
- Make sure MongoDB is running
- Check if port 8000 is available
- Install requirements: `pip install -r backend/requirements.txt`

**Frontend won't load?**
- Check if port 3000 is available
- Make sure backend is running first
- Check browser console for errors (F12)

**Can't connect to MongoDB?**
- Check if MongoDB is running: `docker ps` or `mongod --version`
- Try: `docker run -d -p 27017:27017 --name mongodb mongo`

---

## Stop the Servers

Press `Ctrl + C` in each terminal to stop the servers.

To stop MongoDB (if using Docker):
```bash
docker stop mongodb
docker rm mongodb
```

---

## Summary

You need **3 things running**:

1. ✅ MongoDB (one Docker container or installed)
2. ✅ Backend (one terminal)
3. ✅ Frontend (another terminal)

Then access http://localhost:3000 and start fetching news! 🚀

