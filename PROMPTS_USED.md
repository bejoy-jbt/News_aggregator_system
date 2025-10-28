# 💬 Prompts Used During Development

This document contains all the prompts/questions used during the development of the News Aggregator System.

---

## 🔧 Setup & Configuration

### Initial Setup
- "just check this" - Initial error checking
- "why is this error" - ModuleNotFoundError troubleshooting
- "Request ID: 40b9817b-0cb0-4f61-b375-c58d9e4fbcdc ConnectError: [aborted] read ECONNRESET" - Connection error resolution

### Module & Import Issues
- "i have the path in my main.py file but i cant able to access it" - Routing issues
- "why is my fetcher is not fetching content from the api" - Guardian API parsing
- "why this is the crct api key" - API key validation

### Database Issues
- "does the crud funtion fetches value form the mongo db ?? and the db is not yet created" - MongoDB setup
- "where is the db ??" - Database location clarification
- "{ "topics": [], "count": 0 } why ??" - Empty topics troubleshooting

---

## 🎨 Frontend Development

### UI/UX Development
- "how to open my frontend" - Frontend access
- "why is my html is blank ??" - HTML display issues
- "make the ui interactive and each time i click fetch give me a lodder from heroui" - Loading states
- "have different button like if i click that button i need to view all the document which are stored in the backend" - View all articles feature
- "make this graph interactive" - Chart interactivity

### Functionality
- "tell me am i doing it correct that each time i clicked the fetch and analyize am i getting it from the db or an i fetching it from the api and stroing it in the db and fetching it ??" - Data flow clarification
- "Aggregated Insights: Most reported topic overall Most reported topic with positive sentiment Most reported topic with negative sentiment Average sentiment per news source Daily or weekly sentiment distribution can u add this if u have missed" - Additional insights
- "still no change also check that the Backend is fine too" - Backend verification
- "give me barchat for this and fetch today's date" - Daily sentiment chart

---

## 🐳 Docker & Deployment

### Docker Setup
- "now i want the make a docker continaer and put insode my frontend and backend and using docker compose i need to build my application" - Docker setup request
- "should i have to build frontend and backend diferently or is that fine ??" - Build strategy
- "can i put all in one container??" - Container architecture
- "leave everything give me give me the configuration to set up docker compose for my Frontend and backend" - Docker Compose configuration
- "should i go back to my parent folder ?" - Working directory clarification

### Docker Commands
- "tell me how to start the backend and frontend seperatly just like normal start without any docker .. just normal ??" - Non-Docker setup
- "now my build is stoped i want to use the cache and to continoue the build where i have lleft" - Resume build
- "i have a doubt the frontend is in js but ur runiin it with python how ??" - Frontend serving explanation
- "my docker compose is builed now i want to run it using docker compose give me the code" - Run Docker Compose
- "i think ur runnin it in ur terminal but i cant" - Terminal access issue
- "how can i know that docker compose is running in this port ??" - Port verification
- "i want to host this into docker hub" - Docker Hub deployment
- "how to stop docker ?" - Stop Docker containers
- "how to run my front end" - Frontend access
- "in docker -build write something how to run this application using docker compose" - Documentation request

---

## 🔄 Performance & API Issues

### Response Time Issues
- "why does fetchinng from api takes long time" - Performance optimization
- "why is my api response time is slow but for a while it was running smooth but what happend now ??" - Response time troubleshooting

### Data Flow Issues
- "each time i click fetch and analyize it need to api call to the newapi and guardian and save it in the mongodb" - Fetch and save workflow
- "while calling this api save the content in the db like api/ articles do .." - Database saving verification
- "here return the total number of articles it processed" - Article count requirement

---

## 📦 Git & Version Control

### GitHub Setup
- "i gonna push this into github give me prove .gitignore file and the commands to put in into my git repo git remote add origin https://github.com/bejoy-jbt/News_aggregator_system.git git branch -M main git push -u origin main" - GitHub deployment request
- "PROMPTS_USED.md generate this file" - Documentation request

---

## 📊 Summary

**Total Prompts Used**: ~50 prompts across different categories
- Setup & Configuration: 10 prompts
- Frontend Development: 12 prompts
- Docker & Deployment: 12 prompts
- Performance & API: 5 prompts
- Backend/Database: 8 prompts
- Git & Version Control: 2 prompts

---

## 🎯 Key Features Implemented Based on Prompts

1. ✅ Multi-source news fetching (NewsAPI, Guardian)
2. ✅ MongoDB integration with deduplication
3. ✅ Sentiment analysis using VaderSentiment
4. ✅ Keyword extraction using TF-IDF
5. ✅ Interactive dashboard with Chart.js
6. ✅ Docker containerization
7. ✅ Docker Compose orchestration
8. ✅ API endpoints for analytics
9. ✅ Loading states and notifications
10. ✅ View all articles modal
11. ✅ Daily sentiment charts
12. ✅ Positive/negative topic insights
13. ✅ Source statistics
14. ✅ Article count tracking

---

## 🚀 Technologies Used

- **Backend**: FastAPI, Python, MongoDB, Pymongo
- **Frontend**: HTML, CSS (Tailwind), JavaScript, Chart.js
- **NLP**: VaderSentiment, Scikit-learn
- **APIs**: NewsAPI, Guardian API
- **Containerization**: Docker, Docker Compose
- **Version Control**: Git, GitHub

---

*Generated for News Aggregator System Project*

