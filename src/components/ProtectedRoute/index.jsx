import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, usePermissions } from '../../context/AuthContext';

const ProtectedRoute = ({ children, role, permission }) => {
    const { user } = useAuth();
    const { hasPermission } = usePermissions();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Prioritize permission check if provided
    if (permission && !hasPermission(permission)) {
        // Redirect to a 'forbidden' page or home for simplicity
        return <Navigate to="/" replace />;
    }

    // Fallback to role check if no permission is required
    if (!permission && role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
