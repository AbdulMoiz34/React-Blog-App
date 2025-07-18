import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useLocation } from 'react-router-dom';
import { use, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { signOut, auth } from "../../config/firebase";
import toast from 'react-hot-toast';

export default function Header() {
    const { user, setUser, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(location);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Failed to log out");
        }
    }
    if (user) {
        console.log(true)
    }
    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Personal Blogging App
                        </Typography>
                        {user ? <Button color='inherit' onClick={logout}>Logout</Button> :
                            <NavLink to={location.pathname == "/login" ? "signup" : "login"}>{(location.pathname == "/login") ? "SignUp" : "Login"}</NavLink>}
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="mt-11"></div>
        </>
    );
}
