/* eslint-disable no-useless-catch */
interface LoginCredentials {
    username: string;
    password: string;
}

export const authProvider = {
    async login({ username, password }: LoginCredentials) {
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    expiresInMins: 30, // Optional, defaults to 60
                }),
                // credentials: 'include', // Ensures cookies like tokens are included
            });

            if (!response.ok) {
                throw new Error('Invalid username or password');
            }

            const data = await response.json();
            console.log(data)
            return "";
        } catch (error) {
            throw error;
        }
    },
   checkError: async (error: { status: number }) => {
        try {
            const status = error.status;
            if (status === 401 || status === 403) {
                localStorage.removeItem('email');
                throw new Error('Session expired');
            }
        } catch (error) {
            throw error;
        }
    },

    checkAuth: async () => {
        try {
            if (!localStorage.getItem('email')) {
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        try {
            localStorage.removeItem('email');
        } catch (error) {
            throw error;
        }
    },

    getIdentity: async () => {
        try {
            const email = localStorage.getItem('email');
            return { id: email, fullName: email };
        } catch (error) {
            throw error;
        }
    },
};
