import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Grid, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingDoctor, setEditingDoctor] = useState(null); // State to track the currently editing doctor
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        specialty: '',
        education: '',
        experience: '',
        contact: '',
        fees: '',
        rating: '',
    });
    const [open, setOpen] = useState(false); // State for Snackbar

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/add/getdoc');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/add/deletedoc/${id}`);
            setDoctors(doctors.filter(doctor => doctor.id !== id));
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    const handleEditClick = (doctor) => {
        setEditingDoctor(doctor.id);
        setFormData({
            firstname: doctor.firstname,
            lastname: doctor.lastname,
            specialty: doctor.specialty,
            education: doctor.education,
            experience: doctor.experience,
            contact: doctor.contact,
            fees: doctor.fees,
            rating: doctor.rating,
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/add/updatedoc/${editingDoctor}`, formData);
            if (response.status === 200) {
                setDoctors(doctors.map(doctor => doctor.id === editingDoctor ? response.data : doctor));
                setEditingDoctor(null);
                setOpen(true); // Show success Snackbar
            }
        } catch (error) {
            console.error('Error updating doctor:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ p: 2 }}>
            <TextField
                label="Search by Name or Speciality"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ mb: 3 }}
            />

            {editingDoctor ? (
                <Box component="form" onSubmit={handleFormSubmit} sx={{ mb: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="firstname"
                                label="First Name"
                                fullWidth
                                value={formData.firstname}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="lastname"
                                label="Last Name"
                                fullWidth
                                value={formData.lastname}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="speciality"
                                label="Specialty"
                                fullWidth
                                value={formData.speciality}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="education"
                                label="Education"
                                fullWidth
                                value={formData.education}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="experience"
                                label="Experience (years)"
                                fullWidth
                                type="number"
                                value={formData.experience}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="contact"
                                label="Contact"
                                fullWidth
                                value={formData.contact}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="fees"
                                label="Consultation Fee"
                                fullWidth
                                type="number"
                                value={formData.fees}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="rating"
                                label="Rating"
                                fullWidth
                                type="number"
                                value={formData.rating}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="address"
                                label="Address"
                                fullWidth
                                value={formData.address}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Speciality</TableCell>
                                <TableCell>Education</TableCell>
                                <TableCell>Experience</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Consultation Fee</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredDoctors.map((doctor) => (
                                <TableRow key={doctor.id}>
                                    <TableCell>{doctor.firstname}</TableCell>
                                    <TableCell>{doctor.lastname}</TableCell>
                                    <TableCell>{doctor.speciality}</TableCell>
                                    <TableCell>{doctor.education}</TableCell>
                                    <TableCell>{doctor.experience}</TableCell>
                                    <TableCell>{doctor.contact}</TableCell>
                                    <TableCell>{doctor.fees}</TableCell>
                                    <TableCell>{doctor.rating}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" aria-label="view doctor">
                                            <Visibility />
                                        </IconButton>
                                        <IconButton color="secondary" aria-label="edit doctor" onClick={() => handleEditClick(doctor)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" aria-label="delete doctor" onClick={() => handleDelete(doctor.id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Doctor updated successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ManageDoctors;
