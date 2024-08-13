import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, Snackbar, TextField, Typography, Alert } from '@mui/material';
import Rating from '@mui/material/Rating';
import axios from 'axios';

const AddDoctorForm = ({ addDoctor }) => {
    const [doctorData, setDoctorData] = useState({
        firstname: '',
        lastname: '',
        speciality: '',
        education: '',
        experience: '',
        contact: '',
        fees: '',
        rating: 0,
        address: '',
    });

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData({
            ...doctorData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/add/postdoc', doctorData);
            if (response.status === 201) {
                setOpen(true);
                addDoctor(response.data); // Use the response from your backend
                setDoctorData({
                    firstname: '',
                    lastname: '',
                    speciality: '',
                    education: '',
                    experience: '',
                    contact: '',
                    fees: '',
                    rating: 0,
                    address: '',
                });
            }
        } catch (error) {
            console.error("There was an error adding the doctor!", error);
            setError(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setError(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Add Doctor
            </Typography>
            <Grid container spacing={3}>
                {/* Form fields */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        name="firstname"
                        label="First Name"
                        fullWidth
                        value={doctorData.firstname}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        name="lastname"
                        label="Last Name"
                        fullWidth
                        value={doctorData.lastname}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        name="speciality"
                        label="Speciality"
                        fullWidth
                        select
                        value={doctorData.speciality}
                        onChange={handleChange}
                    >
                        {/* Populate with actual specialties */}
                        <MenuItem value="Cardiology">Cardiology</MenuItem>
                        <MenuItem value="Dermatology">Dermatology</MenuItem>
                        <MenuItem value="Neurology">Neurology</MenuItem>
                        <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                        <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                        <MenuItem value="ENT">ENT Specialist</MenuItem>
                        <MenuItem value="Gynecologist">Gynecologist</MenuItem>
                    </TextField>
                </Grid>
                {/* Other fields */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        name="education"
                        label="Education"
                        fullWidth
                        value={doctorData.education}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        name="experience"
                        label="Experience (years)"
                        fullWidth
                        type="number"
                        value={doctorData.experience}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        name="contact"
                        label="Contact"
                        fullWidth
                        value={doctorData.contact}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        name="fees"
                        label="Consultation Fee"
                        fullWidth
                        type="number"
                        value={doctorData.fees}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        name="address"
                        label="Address"
                        fullWidth
                        value={doctorData.address}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography component="legend">Star Rating</Typography>
                    <Rating
                        name="rating"
                        value={doctorData.rating}
                        onChange={(event, newValue) => {
                            setDoctorData({
                                ...doctorData,
                                rating: newValue,
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Add Doctor
                    </Button>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Doctor added successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    There was an error adding the doctor.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddDoctorForm;
