import { createContext } from "react";

const AuthContext = createContext({
    user: null as null | object,
    loading: false,
    setUser: (user: null | object) => { },
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => { }
});

export default AuthContext;