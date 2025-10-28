import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Envelope, Lock, Eye, EyeSlash } from '@phosphor-icons/react';
import styles from './Login.module.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirigir si ya está autenticado
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación básica
        if (!credentials.email || !credentials.password) {
            setError('Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await login(credentials);

            if (result.success) {
                // La redirección se maneja automáticamente por el efecto
            } else {
                setError(result.error || 'Error en el inicio de sesión');
            }
        } catch (err) {
            setError('Error de conexión. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error cuando el usuario empiece a escribir
        if (error) setError('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.login}>
            <div className={styles.container_login}>
                {/* Encabezado con tipografía elegante */}
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <div className={styles.logoIcon}>⚡</div>
                    </div>
                    <h2 className={styles.title}>Bienvenido de vuelta</h2>
                    <p className={styles.subtitle}>
                        Ingresa a tu cuenta para continuar
                    </p>
                </div>
                
                {/* Mostrar error */}
                {error && (
                    <div className={styles.error_message}>
                        <span className={styles.errorIcon}>⚠️</span>
                        {error}
                    </div>
                )}

                <form className={styles.form_login} onSubmit={handleSubmit}>
                    <div className={styles.input_group}>
                        <label htmlFor="email" className={styles.input_label}>
                            Correo electrónico
                        </label>
                        <div className={styles.input_container}>
                            <Envelope size={20} className={styles.input_icon} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className={styles.input_field}
                                placeholder="tu@email.com"
                                value={credentials.email}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    
                    <div className={styles.input_group}>
                        <label htmlFor="password" className={styles.input_label}>
                            Contraseña
                        </label>
                        <div className={styles.input_container}>
                            <Lock size={20} className={styles.input_icon} />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className={styles.input_field}
                                placeholder="••••••••"
                                value={credentials.password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <button 
                                type="button"
                                className={styles.password_toggle}
                                onClick={togglePasswordVisibility}
                                disabled={loading}
                            >
                                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    
                    <div className={styles.forgot_password}>
                        <Link to="/forgot-password" className={styles.forgot_link}>
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    
                    <div className={styles.button_container}>
                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.login_button}
                        >
                            {loading ? (
                                <div className={styles.loading_container}>
                                    <div className={styles.loading_spinner}></div>
                                    <span>Iniciando sesión...</span>
                                </div>
                            ) : (
                                "Iniciar Sesión"
                            )}
                        </button>
                    </div>
                    
                    <div className={styles.section_register}>
                        <span className={styles.register_text}>¿No tienes una cuenta? </span>
                        <Link
                            to="/register"
                            className={styles.link_register}
                        >
                            Regístrate aquí
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;