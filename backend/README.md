# News Aggregator Backend

A FastAPI-based news aggregation platform with sentiment analysis and topic extraction.

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**
   Create a `.env` file with:
   ```
   NEWSAPI_KEY=your_key_here
   GUARDIAN_KEY=your_key_here
   MONGO_URL=mongodb://localhost:27017/
   ```

3. **Run MongoDB:**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo
   ```

4. **Run the application:**
   ```bash
   # From the backend directory
   uvicorn app.main:app --reload
   ```

   Or from the app directory:
   ```bash
   # From the app directory
   python -m uvicorn main:app --reload
   ```

## API Endpoints

- `GET /` - API info
- `GET /api/fetch` - Fetch news from all sources
- `GET /api/topics` - Get top topics
- `GET /api/sentiment` - Get sentiment analysis
- `GET /api/sources` - Get statistics by source
- `GET /docs` - Interactive API documentation

## Docker

Build and run with Docker:
```bash
docker build -t news-aggregator-backend .
docker run -p 8000:8000 news-aggregator-backend
```

