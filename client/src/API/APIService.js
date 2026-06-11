import axios from 'axios';
import translations from '../context/translations';
const { VITE_API_URL } = import.meta.env;

const apiClient = axios.create({
    baseURL: VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401 && !err.config.url.includes('auth/me') && !err.config.url.includes('auth/login')) {
            const lang = document.documentElement.lang || 'he';
            const t = translations[lang];
            const errCode = err.response?.data?.error;
            if (errCode === 'TOKEN_EXPIRED') sessionStorage.setItem('authMsg', t.sessionExpired);
            window.location.href = '/nnc/login';
        }
        return Promise.reject(err);
    }
);

export const api = {
    get: (resource, params = {}) => apiClient.get(`/${resource}`, { params }),
    post: (resource, data) => apiClient.post(`/${resource}`, data),
    put: (resource, id, data) => apiClient.put(`/${resource}/${id}`, data), 
    patch: (resource, id, data) => apiClient.patch(`/${resource}/${id}`, data),   
    delete: (resource, id) => apiClient.delete(`/${resource}/${id}`),
};