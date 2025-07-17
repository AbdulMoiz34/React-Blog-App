import { Routes, Route } from "react-router-dom"
import { Signup } from "../pages"

const Router = () => {
    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}

export default Router;