import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authServices';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verificar si hay token al cargar la app
    useEffect(() => {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (token) {
            checkAuth();
        } else {
            setLoading(false);
        }
    }, []);

    const checkAuth = async () => {
        try {
            const userProfile = await authService.getProfile();
            setUser(userProfile);
        } catch (error) {
            console.error('Error verificando autenticación:', error);
            // Si hay error, limpiamos el token inválido
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);

            if (response.token) {
                // Obtener el perfil del usuario después del login exitoso
                await checkAuth(); // Esto actualiza el estado del usuario
                return { success: true, data: response };
            } else {
                return { success: false, error: 'No se recibió token del servidor' };
            }
        } catch (error) {
            console.error('Error en login:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Error en el login'
            };
        }
    };
    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            return { success: true, data: response };
        } catch (error) {
            console.error('Error en registro:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Error en el registro'
            };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Error en logout:', error);
        } finally {
            // Siempre limpiamos el estado local
            setUser(null);
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken');
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};