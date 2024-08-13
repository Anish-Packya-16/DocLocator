import AccountCircle from '@mui/icons-material/AccountCircle'; // Import AccountCircle icon
import Logout from '@mui/icons-material/Logout'; // Import Logout icon
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = ({ onMenuClick, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // useNavigate hook

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleMenuClose();
    navigate('/'); // Redirect to login page
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <IconButton color="inherit" onClick={handleAccountClick}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ '& .MuiMenu-paper': { width: 200 } }}
        >
          <MenuItem disabled style={{ display: 'flex', alignItems: 'center', cursor: 'default' }}>
            <AccountCircle style={{ marginRight: '10px' }} />
            Hi, Admin
          </MenuItem>
          <MenuItem onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
