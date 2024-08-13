import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import AdminDashboard1 from './AdminDashboard1';
import DropdownMenu from './AdminDropdown';
import AdminNavbar from './AdminNav';
import UsersList from './UsersList';
import AddDoctorForm from './AdminAddDoc';
import ManageDoctors from './manageDocs';
import AppointmentsPage from './Appointments';

// Dummy components for routing


const Schedules = () => <Box>Schedules Management Page</Box>;

const AdminPortal = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Replace with your actual API call
      const response = await axios.get('/api/user');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AdminNavbar onMenuClick={handleMenuClick} userData={user} onLogout={handleLogout} />
      <DropdownMenu anchorEl={menuAnchor} onClose={handleMenuClose} />
      <main style={{ flexGrow: 1, padding: '16px', marginTop: 64 }}>
        <Container>
          <Toolbar />
          <Routes>
            <Route path="/" element={<AdminDashboard1 />} />
            <Route path="dash" element={<AdminDashboard1 />} />
            <Route path="doctors" element={<ManageDoctors />} />
            <Route path="usersList" element={<UsersList />} />
           
            <Route path="schedules" element={<Schedules />} />
            <Route path="adddoctors" element={<AddDoctorForm />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            
          </Routes>
        </Container>
      </main>
    </div>
  );
};

export default AdminPortal;
