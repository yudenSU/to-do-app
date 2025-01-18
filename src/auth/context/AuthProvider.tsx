import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { User } from '../../types/interfaces';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        
        let response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, expiresInMins: 30 }),
        });

        if (!response.ok) {
            //Check if email login is valid
            //To do: check if regex would be a good approach
            const emailCheckResponse = await fetch(`https://dummyjson.com/users/filter?key=email&value=${username}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!emailCheckResponse.ok) {
                throw new Error('Invalid username or password');
            }
            const data = await emailCheckResponse.json()
            if (data.users && Array.isArray(data.users) && data.users.length > 0) {
                // If user email is found extract user name and sign in
                const usernameInfered = data.users[0].username

                response = await fetch('https://dummyjson.com/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: usernameInfered, password, expiresInMins: 30 }),
                });
            } else {
                throw new Error('Invalid username or password');
            }
        }

        const data = await response.json();
        //Compromise due to CORS bug in DummyJSON
        localStorage.setItem('accessToken', data.accessToken); 
        localStorage.setItem('refreshToken', data.refreshToken); 

        setUser({ 
            id: data.id, 
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            gender: data.gender,
            username: data.username,
            image: data.image
        });
        return true;
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    const getUser = async () => {

        const accessToken = localStorage.getItem("accessToken")

        let response = await fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });
        //If unauthorised, attempt refresh
        if (response.status == 401) {
            const refreshToken = localStorage.getItem("refreshToken")

            const refreshResponse = await fetch('https://dummyjson.com/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${accessToken}`
                    'Authorization': `Bearer asd`

                },
                body: JSON.stringify({
                    refreshToken: `${refreshToken}`,
                  }),
            });

            if (!refreshResponse.ok) {
                return null
            }

            const refreshData = await refreshResponse.json();

            localStorage.setItem('accessToken', refreshData.accessToken); 
            localStorage.setItem('refreshToken', refreshData.refreshToken); 

            response = await fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });
        }
        
        if (!response.ok) {
            return null
        }

        const data = await response.json();

        const userObject = { 
            id: data.id, 
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            gender: data.gender,
            username: data.username,
            image: data.image
        }

        setUser(userObject);

        return userObject;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

