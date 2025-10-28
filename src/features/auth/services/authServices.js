import axios from 'axios'

const BASE_URL = 'https://reflexoperu-v3.marketingmedico.vip/backend/public/api/'

// Configuración base de Axios
const api = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true, // Envia las cookies automáticamente

});

// Interceptor para agregar el token manualmente en los headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Guardaremos el token en localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    // Registro de usuario
    register: async (userData) => {
        const response = await api.post('/register', userData);
        return response.data;
    },

    // Login de usuario
    login: async (credentials) => {
        const response = await api.post('/login', credentials);
        if (response.data.token) {
            // Guardar token en localStorage en lugar de depender de cookies
            localStorage.setItem('authToken', response.data.token);
            // También podríamos guardar en sessionStorage para más seguridad
            sessionStorage.setItem('authToken', response.data.token);
        }
        return response.data;
    },

    // Logout de usuario
    logout: async () => {
        // Limpiar tokens locales
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');

        try {
            const response = await api.delete('/logout');
            return response.data;
        } catch (error) {
            // Aún así limpiamos los tokens aunque falle la petición
            console.error('Error en logout:', error);
            return { message: 'Sesión cerrada localmente' };
        }
    },
    // Obtener perfil del usuario
    getProfile: async () => {
        const response = await api.get('/profile');
        return response.data;
    }
};

export default api;