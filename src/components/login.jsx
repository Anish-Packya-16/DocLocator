import React, { useState } from 'react';
import { Box, Button, Container, Grid, Snackbar, TextField, Typography, Alert } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = ({ setUserData }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/docapp/login', { email, password });
      if (response.status === 200) {
        // Successfully logged in
        const isUserAdmin = email.includes(".admin");
        setUserData({ email });
        setSnackbarMessage('Login Successful');
        setSnackbarOpen(true);
        setTimeout(() => {
          if (isUserAdmin) {
            navigate("/admin/dash");
          } else {
            navigate("/homepage");
          }
        }, 2000); // Delay navigation to allow snackbar to display
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="left-container"></div>
      <Container component="main" maxWidth="xs" className="right-container">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                >
                  Login with Google
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                >
                  Login with Facebook
                </Button>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3 }}
            >
              Don’t have an account?{' '}
              <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position at top right
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            iconMapping={{
              success: <CheckCircleIcon fontSize="inherit" />,
            }}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default LoginPage;
