import React from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import styles from './Profile.module.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const { profile, loading, error } = useProfile();

    const handleLogout = async () => {
        await logout();
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingText}>Cargando perfil...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorText}>Error: {error}</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.profileCard}>
                    <div className={styles.header}>
                        <div className={styles.headerContent}>
                            <h1 className={styles.title}>Perfil de Usuario</h1>
                            <button
                                onClick={handleLogout}
                                className={styles.logoutButton}
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>

                    <div className={styles.content}>
                        {profile && (
                            <div className={styles.grid}>
                                <div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>ID</label>
                                        <p className={styles.value}>{profile.id}</p>
                                    </div>

                                    <div className={styles.field}>
                                        <label className={styles.label}>Nombres</label>
                                        <p className={styles.value}>{profile.name}</p>
                                    </div>

                                    <div className={styles.field}>
                                        <label className={styles.label}>Email</label>
                                        <p className={styles.value}>{profile.email}</p>
                                    </div>

                                    <div className={styles.field}>
                                        <label className={styles.label}>Nombre de Usuario</label>
                                        <p className={styles.value}>{profile.user_name}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Teléfono</label>
                                        <p className={styles.value}>{profile.phone}</p>
                                    </div>

                                    <div className={styles.field}>
                                        <label className={styles.label}>Rol</label>
                                        <p className={styles.value}>
                                            {profile.role?.name || 'N/A'}
                                        </p>
                                    </div>

                                    <div className={styles.field}>
                                        <label className={styles.label}>País</label>
                                        <p className={styles.value}>
                                            {profile.country?.name || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!profile && (
                            <div className={styles.noProfile}>
                                <p className={styles.noProfileText}>No se pudo cargar la información del perfil</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Información de sesión actual */}
                <div className={styles.sessionInfo}>
                    <h2 className={styles.sessionTitle}>Información de Sesión</h2>
                    <div className={styles.sessionGrid}>
                        <div className={styles.field}>
                            <label className={styles.label}>Usuario autenticado</label>
                            <p className={styles.value}>
                                {user ? 'Sí' : 'No'}
                            </p>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Estado</label>
                            <p className={styles.status}>
                                Sesión activa
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;