import { useAuth } from '../features/auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import styles from './ProtectedRoute.module.css';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className={styles.charger_windows}>
                <div className={styles.charge}>
                    Cargando...
                </div>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;