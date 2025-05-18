import axios from "axios";
import store from '../store/store';

const api = axios.create({
    baseURL: "/api", // Laravel backend'in kök adresi
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch({ type: 'auth/logout' });
        }
        return Promise.reject(error);
    }
);

export default api;