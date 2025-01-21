import { createContext } from "react";
import { User } from "../../types/interfaces";



interface AuthContextType {
    user: User | null;
    refresh: () => Promise<boolean>;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    getUser: () => Promise<User | null>
}

export const AuthContext = createContext<AuthContextType | null>(null);

