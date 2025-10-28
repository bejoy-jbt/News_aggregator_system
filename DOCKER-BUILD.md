# 🐳 Docker Build and Run Guide

## 🚀 Quick Start (Run the Application)

### First Time Setup

1. **Create `.env` file** (if not exists):
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API keys:
# NEWSAPI_KEY=your_newsapi_key_here
# GUARDIAN_KEY=your_guardian_key_here
```

2. **Build and start all services:**
```bash
docker-compose up -d --build
```

3. **Access the application:**
- **Frontend**: Open `http://localhost:3000`
- **Backend API**: `http://localhost:8000`
- **API Docs**: `http://localhost:8000/docs`

### Running the Application

**Start all services:**
```bash
docker-compose up -d
```

**Stop all services:**
```bash
docker-compose down
```

**View logs:**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

**Check service status:**
```bash
docker-compose ps
```

**Restart a specific service:**
```bash
docker-compose restart backend
docker-compose restart frontend
```

---

## 📋 Service Information

| Service | Port | URL | Description |
|---------|------|-----|-------------|
| **MongoDB** | 27017 | `mongodb://localhost:27017` | Database |
| **Backend API** | 8000 | `http://localhost:8000` | FastAPI server |
| **Frontend** | 3000 | `http://localhost:3000` | Web dashboard |
| **API Docs** | 8000 | `http://localhost:8000/docs` | Swagger UI |

---

## 🔨 Build Commands

### Resume Build with Cache

```bash
# Continue building with cache (recommended)
docker-compose build

# Build and start all services
docker-compose up -d --build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

## Build Options

### Use Cache (Fast - Recommended)
```bash
docker-compose build
```
✓ Uses previously cached layers
✓ Faster build time
✓ Good for resuming stopped builds

### Rebuild Everything
```bash
docker-compose build --no-cache
```
✓ Fresh build from scratch
✓ Re-downloads all dependencies
✓ Use when dependencies updated

### Build in Parallel
```bash
docker-compose build --parallel
```
✓ Builds backend and frontend simultaneously
✓ Faster overall build time

## Start After Build

```bash
# Build and start
docker-compose up -d --build

# Just start (if already built)
docker-compose up -d

# Start with output
docker-compose up
```

## Check Build Status

```bash
# See running containers
docker-compose ps

# Check build logs
docker-compose logs

# Check specific service
docker-compose logs backend
docker-compose logs frontend
```

## Common Issues

**Build stuck?**
```bash
# Stop everything
docker-compose down

# Clean and rebuild
docker-compose build --no-cache
docker-compose up -d
```

**Cache issues?**
```bash
# Remove all build cache
docker builder prune

# Then rebuild
docker-compose build
```

**See what's using cache:**
```bash
docker-compose build --progress=plain
```

## Quick Commands Summary

| Command | What it does |
|---------|-------------|
| `docker-compose build` | Build with cache |
| `docker-compose build --no-cache` | Fresh build |
| `docker-compose up -d --build` | Build and start |
| `docker-compose ps` | Check status |
| `docker-compose logs -f` | View logs |
| `docker-compose down` | Stop everything |

---

## 🛠️ Troubleshooting

### Port Already in Use

**Error**: `Bind for 0.0.0.0:3000 failed: port is already allocated`

**Fix**:
```bash
# Windows: Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Then restart
docker-compose up -d
```

### MongoDB Connection Error

**Error**: Backend can't connect to MongoDB

**Fix**:
```bash
# Check if MongoDB container is running
docker-compose ps

# Check MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Backend/Frontend Not Working

**Fix**:
```bash
# Restart everything
docker-compose down
docker-compose up -d

# Check logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Clear Everything and Start Fresh

```bash
# Stop all containers
docker-compose down

# Remove all containers, networks, and volumes
docker-compose down -v

# Rebuild from scratch
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

---

