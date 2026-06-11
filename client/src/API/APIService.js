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
    async err => {
        const url = err.config?.url || '';
        const status = err.response?.status;
        const errCode = err.response?.data?.error;
        const lang = document.documentElement.lang || 'he';
        const t = translations[lang];

        if (status === 401) {
            if (url.includes('auth/login')) return Promise.reject(err);

            if (errCode === 'TOKEN_EXPIRED' && !url.includes('auth/refresh-token')) {
                try {
                    await apiClient.post('/auth/refresh-token');
                    return apiClient.request(err.config);
                } catch (refreshError) {
                    sessionStorage.setItem('authMsg', t.sessionExpired);
                    if (!url.includes('auth/me')) {
                        window.location.href = '/nnc/login';
                    }
                    return Promise.reject(refreshError);
                }
            }

            if (!url.includes('auth/me') && !url.includes('auth/refresh-token')) {
                window.location.href = '/nnc/login';
            }
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