import axios from 'axios';

export const tokenStorageKey = 'auth_token';

const api = axios.create({
    baseURL: `https://${window.location.hostname}:5001/api`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(tokenStorageKey)}`
    }    
});

export default api;