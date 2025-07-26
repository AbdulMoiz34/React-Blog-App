import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    return (
        <>
            {children ? children : <Outlet />}
        </>
    )
}

export default ProtectedRoute;