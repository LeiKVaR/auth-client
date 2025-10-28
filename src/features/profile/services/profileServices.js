import api from '../../auth/services/authServices';

export const profileService = {
    // Obtener perfil del usuario
    getProfile: async () => {
        const response = await api.get('/profile');
        return response.data;
    },

    // Actualizar perfil del usuario (si el backend lo permite)
    updateProfile: async (profileData) => {
        const response = await api.put('/profile', profileData);
        return response.data;
    }
};