import React, { createContext, useReducer, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

const initialState = {
    user: null,
    token: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload.user, token: action.payload.token };
        case 'UPDATE_USER':
            return { ...state, user: action.payload.user };
        case 'LOGOUT':
            return { ...state, user: null, token: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (token && storedUser && storedUser !== 'undefined') {
                const user = JSON.parse(storedUser);
                dispatch({ type: 'LOGIN', payload: { user, token } });
            }
        } catch (error) {
            console.error('Failed to parse user from localStorage', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
        }
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN', payload: { user, token } });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    const updateUserRole = async (newRole) => {
        const token = localStorage.getItem('token');
        if (!state.user || !token) {
            console.error('Action non autorisée : utilisateur ou token manquant.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/me/role', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'La mise à jour du rôle a échoué.');
            }

            const { user: updatedUser } = await response.json();
            
            dispatch({ type: 'UPDATE_USER', payload: { user: updatedUser } });
            localStorage.setItem('user', JSON.stringify(updatedUser));

        } catch (error) {
            console.error("Erreur lors de la mise à jour du rôle:", error);
        }
    };

    const hasPermission = (permission) => {
        if (!state.user || !Array.isArray(state.user.permissions)) {
            return false;
        }
        return state.user.permissions.includes(permission);
    };

    return (
        <AuthContext.Provider value={{ user: state.user, token: state.token, login, logout, updateUserRole, hasPermission }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const usePermissions = () => {
    const { hasPermission } = useAuth();
    return { hasPermission };
};
