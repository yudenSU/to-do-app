import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

interface User {
    id: string;
    fullName: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, expiresInMins: 30 }),
        });

        if (!response.ok) {
            throw new Error('Invalid username or password');
        }

        const data = await response.json();
        localStorage.setItem('email', data.email); // Example: storing email
        setUser({ id: data.id, fullName: data.name });
    };

    const logout = () => {
        localStorage.removeItem('email');
        setUser(null);
    };

    const checkAuth = () => {
        return false
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

