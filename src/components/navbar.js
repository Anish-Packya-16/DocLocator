import AccountCircle from '@mui/icons-material/AccountCircle'; // Import AccountCircle icon
import Logout from '@mui/icons-material/Logout'; // Import Logout icon
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ userData, onLogout, isAdmin }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (userData && !isAdmin) {
      // Fetch the user's first name from the backend if not an admin
      axios.get(`http://localhost:8080/docapp/user/${userData.email}`)
        .then(response => {
          setFirstName(response.data.firstName);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userData, isAdmin]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout(); // Call logout function
    handleMenuClose(); // Close the menu
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#283e51' }}>
      <Toolbar>
        <img src='./logo1.png' alt="Doc Locator Logo" style={{ height: '80px', marginRight: '10px', width: '110px' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Doc Locator
        </Typography>
        {userData ? (
          <>
            <Button color="inherit" component={Link} to="/homepage">Home</Button>
            <Button color="inherit" component={Link} to="/result">Book Appointment</Button>
            <Button color="inherit" component={Link} to="/AboutUs">About Us</Button>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled style={{ display: 'flex', alignItems: 'center', cursor: 'default' }}>
                <AccountCircle style={{ marginRight: '10px' }} />
                Hi, {firstName}
              </MenuItem>
              <MenuItem onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
                <Logout style={{ marginRight: '10px' }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/homepage">Home</Button>
            <Button color="inherit" component={Link} to="/result">Book Appointment</Button>
            <Button color="inherit" component={Link} to="/AboutUs">About Us</Button>
            <Button color="inherit" component={Link} to="/loginpage">Login</Button>
            <Button color="inherit" component={Link} to="/register">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
