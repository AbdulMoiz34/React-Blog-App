import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    console.log("ProtectedRoute isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
        navigate("/login");
        return null;
    }
    return (
        <>
            {children ? children : <Outlet />}
        </>
    )
}

export default ProtectedRoute;