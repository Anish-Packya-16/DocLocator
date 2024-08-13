import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Container, Grid, MenuItem, Snackbar, TextField, Typography, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    password: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/docapp/signup', formData);
      console.log(response.data);
      setSnackbarMessage('Registered Successfully');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/loginpage');
      }, 2000); // Delay navigation to allow snackbar to display
    } catch (error) {
      console.error('Error registering user:', error);
      // Optionally handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="register-page">
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
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dob"
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ mb: 2 }}
            >
              Sign Up with Google
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3 }}
            >
              Already have an account?{' '}
              <Link to="/loginpage" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default Register;
