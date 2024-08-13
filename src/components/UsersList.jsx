import { Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DropdownMenu from './AdminDropdown';
import AdminNavbar from './AdminNav';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  useEffect(() => {
    // Fetch all registered users from the backend
    axios.get('http://localhost:8080/docapp/users')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError('Failed to load users.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter users based on search input
    const result = users.filter(user =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
  }, [search, users]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box color="red" textAlign="center">{error}</Box>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminNavbar onMenuClick={handleMenuClick} />
      <DropdownMenu anchorEl={menuAnchor} onClose={handleMenuClose} />
      <main style={{ flexGrow: 1, padding: '16px', marginTop: 64 }}>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TableContainer component={Paper} style={{ marginTop: 16 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length ? filteredUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell style={{ padding: '8px 16px' }}>{user.email}</TableCell>
                  <TableCell style={{ padding: '8px 16px' }}>{user.firstName}</TableCell>
                  <TableCell style={{ padding: '8px 16px' }}>{user.lastName}</TableCell>
                  <TableCell style={{ padding: '8px 16px' }}>{user.dob}</TableCell>
                  <TableCell style={{ padding: '8px 16px' }}>{user.gender}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>No users found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};

export default UsersList;
