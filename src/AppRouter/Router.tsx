import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "../pages"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router