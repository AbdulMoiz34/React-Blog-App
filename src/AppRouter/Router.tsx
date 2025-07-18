import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Login, Signup } from "../pages";
import { useContext } from "react";
import AuthContext from "../context/AuthContext/";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route path="/signup" element={isAuthenticated ? <Navigate to={"/"} /> : <Signup />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to={"/"} /> : <Login />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }>
                </Route>
                <Route path="*" element={<div>404 page</div>} />
            </Routes>

        </>
    )
}

export default Router;