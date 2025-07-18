import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Signup } from "../pages";
import { useContext } from "react";
import AuthContext from "../context/AuthContext/";

const Router = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/signup" element={isAuthenticated ? <Navigate to={"/"} /> : <Signup />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to={"/"} /> : <Login />} />
        </Routes>
    )
}

export default Router;