import { createContext } from "react";

interface User {
    id: string;
    fullName: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => boolean
}

export const AuthContext = createContext<AuthContextType | null>(null);

