import axios from 'axios';

export const tokenStorageKey = 'auth_token';

const api = axios.create({
    baseURL: `https://${window.location.hostname}:5001/api`,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem(tokenStorageKey)}`
    return config
});

export default api;