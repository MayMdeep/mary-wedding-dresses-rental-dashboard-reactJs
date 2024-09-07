import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Route/AuthContext";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout("")
        handleClose();
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2} borderBottom="1px solid #e9e9e9" mb={4}>
            {!isSidebarOpen && (
                <button onClick={toggleSidebar} className="toggle-button-open-header">
                    <MenuIcon sx={{ color: "black !important" }} />
                </button>
            )}
            <Box display="flex" borderRadius="3px">
                <Input sx={{ ml: 2, flex: 1 }} placeholder="Search for anything " color="success" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box display="flex">
                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <PersonIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;