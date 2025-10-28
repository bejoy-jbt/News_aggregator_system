// Dynamic API URL configuration for Docker
const getApiUrl = () => {
    // When running in Docker, use backend service name
    if (window.location.port === '3000' && !window.location.hostname.includes('localhost')) {
        return 'http://backend:8000';
    }
    // Local development
    return 'http://localhost:8000';
};

// Update all fetch calls in app.js
const API_BASE = getApiUrl();

