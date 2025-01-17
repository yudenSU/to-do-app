import { createContext } from "react";
import { User } from "../../types/interfaces";



interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuth: () => boolean
}

export const AuthContext = createContext<AuthContextType | null>(null);

