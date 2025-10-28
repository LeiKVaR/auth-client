import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  User, 
  IdentificationCard, 
  Phone, 
  Envelope, 
  Lock, 
  Check 
} from '@phosphor-icons/react';
import styles from './Register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        document_number: '',
        name: '',
        paternal_lastname: '',
        maternal_lastname: '',
        email: '',
        phone: '',
        user_name: '',
        password: '',
        last_session: new Date().toISOString().split('T')[0],
        account_statement: false,
        document_type_id: 1,
        country_id: 179
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.account_statement) {
            setMessage('Debes aceptar los términos y condiciones');
            return;
        }

        setLoading(true);
        setMessage('');

        const result = await register(formData);

        if (result.success) {
            setMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
            setFormData({
                document_number: '',
                name: '',
                paternal_lastname: '',
                maternal_lastname: '',
                email: '',
                phone: '',
                user_name: '',
                password: '',
                last_session: new Date().toISOString().split('T')[0],
                account_statement: false,
                document_type_id: 1,
                country_id: 179
            });
        } else {
            setMessage(result.error || 'Error en el registro');
        }

        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        if (message) setMessage('');
    };

    return (
        <div className={styles.register}>
            <div className={styles.container}>
                <div className={styles.card}>
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.logo}>
                            <div className={styles.logoIcon}>👤</div>
                        </div>
                        <h1 className={styles.title}>Crear Cuenta</h1>
                        <p className={styles.subtitle}>
                            Completa tus datos para comenzar
                        </p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* Primera fila - Documento y Nombres */}
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <IdentificationCard size={18} className={styles.labelIcon} />
                                    N° Documento
                                </label>
                                <input
                                    name="document_number"
                                    type="text"
                                    required
                                    className={styles.input}
                                    placeholder="Ingresa tu número de documento"
                                    value={formData.document_number}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <User size={18} className={styles.labelIcon} />
                                    Nombres
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className={styles.input}
                                    placeholder="Tus nombres"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Segunda fila - Apellidos */}
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <User size={18} className={styles.labelIcon} />
                                    Apellido Paterno
                                </label>
                                <input
                                    name="paternal_lastname"
                                    type="text"
                                    required
                                    className={styles.input}
                                    placeholder="Apellido paterno"
                                    value={formData.paternal_lastname}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <User size={18} className={styles.labelIcon} />
                                    Apellido Materno
                                </label>
                                <input
                                    name="maternal_lastname"
                                    type="text"
                                    required
                                    className={styles.input}
                                    placeholder="Apellido materno"
                                    value={formData.maternal_lastname}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                <Envelope size={18} className={styles.labelIcon} />
                                Correo Electrónico
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className={styles.input}
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Tercera fila - Teléfono y Usuario */}
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <Phone size={18} className={styles.labelIcon} />
                                    Teléfono
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    className={styles.input}
                                    placeholder="Número de teléfono"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <User size={18} className={styles.labelIcon} />
                                    Nombre de Usuario
                                </label>
                                <input
                                    name="user_name"
                                    type="text"
                                    required
                                    className={styles.input}
                                    placeholder="Elige un nombre de usuario"
                                    value={formData.user_name}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                <Lock size={18} className={styles.labelIcon} />
                                Contraseña
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                className={styles.input}
                                placeholder="Crea una contraseña segura"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Términos y condiciones */}
                        <div className={styles.termsContainer}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    name="account_statement"
                                    type="checkbox"
                                    checked={formData.account_statement}
                                    onChange={handleChange}
                                    className={styles.checkboxInput}
                                    disabled={loading}
                                />
                                <span className={styles.checkbox}>
                                    {formData.account_statement && <Check size={12} weight="bold" />}
                                </span>
                                Acepto los <Link to="/terms" className={styles.termsLink}>términos y condiciones</Link>
                            </label>
                        </div>

                        {/* Mensajes */}
                        {message && (
                            <div className={`${styles.message} ${
                                message.includes('éxito') ? styles.messageSuccess : styles.messageError
                            }`}>
                                {message.includes('éxito') ? '✓' : '⚠'} {message}
                            </div>
                        )}

                        {/* Botón de registro */}
                        <button
                            type="submit"
                            disabled={loading || !formData.account_statement}
                            className={styles.submitButton}
                        >
                            {loading ? (
                                <div className={styles.loading}>
                                    <div className={styles.spinner}></div>
                                    Creando cuenta...
                                </div>
                            ) : (
                                "Crear Cuenta"
                            )}
                        </button>

                        {/* Enlace a login */}
                        <div className={styles.loginLink}>
                            <span>¿Ya tienes cuenta? </span>
                            <Link to="/login">Inicia sesión aquí</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;