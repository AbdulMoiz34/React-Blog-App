import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { signOut, auth } from "../../config/firebase";
import toast from 'react-hot-toast';

export default function Header() {
    const { user, setUser } = useContext(AuthContext);
    const location = useLocation();

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

    const textTransform: {} = { textTransform: "capitalize", color: "#fff", padding: "2px 16px" };

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Personal Blogging App
                        </Typography>
                        {user ? (
                            <div className='flex justify-center items-center gap-2'>
                                <NavLink to="./profile">
                                    <Button className='shadow-sm' style={{ ...textTransform, border: "1px solid darkblue" }} size='small'>
                                        {user.userName}
                                    </Button>
                                </NavLink>
                                <NavLink to={location.pathname == "/dashboard" ? "/" : "/dashboard"}>
                                    <Button color='inherit' style={textTransform}>{(location.pathname == "/dashboard" ? "Home" : "Dashboard")}</Button>
                                </NavLink>
                                <Button color='inherit' onClick={logout} style={textTransform}>Logout</Button>
                            </div>) :
                            <NavLink to={location.pathname == "/login" ? "signup" : "login"}>{(location.pathname == "/login") ? "SignUp" : "Login"}</NavLink>}
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="mt-11"></div>
        </>
    );
}
