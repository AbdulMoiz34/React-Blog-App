import { createContext } from "react";

export interface User {
    email: string | null;
    userName: string | null;
    uid: string | null;
    userImage: string | null;
}
interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    setUser: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { }
});

export default AuthContext;