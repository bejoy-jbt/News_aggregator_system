// Backend API URL configuration
const API_BASE_URL = (() => {
    // In development, use localhost
    // In production (Docker), use backend service name
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8000';
    }
    return 'http://backend:8000'; // Docker internal network
})();

console.log('API Base URL:', API_BASE_URL);

// Helper function to make API calls
async function apiCall(endpoint) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url);
    return response.json();
}

