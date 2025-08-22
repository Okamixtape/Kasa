import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        if (token && userName) {
            setUser({ name: userName });
        }
    }, []);

    const login = (token, userName) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        setUser({ name: userName });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
