import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Home, Login, NotFound, Profile, Signup, UserBlogsPage } from "../pages";
import { useContext } from "react";
import AuthContext from "../context/AuthContext/";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route path="/signup" element={isAuthenticated ? <Navigate to={"/dashboard"} /> : <Signup />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to={"/dashboard"} /> : <Login />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/" element={<Home />} />
                <Route path="/blogs/:userId" element={<UserBlogsPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
            </Routes>

        </>
    )
}

export default Router;