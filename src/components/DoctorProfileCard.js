import React from 'react';
import { Card, CardContent, Typography, Button, Avatar, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';


const DoctorProfileCard = ({ doctor }) => {
    return (
        <Card className="doctor-card">
            <Box display="flex" justifyContent="center" marginTop="16px">
                <Avatar src={doctor.imageUrl} alt={doctor.name} sx={{ width: 100, height: 100 }} />
            </Box>
            <CardContent>
                <Typography variant="h5" component="div" align="center">
                    {doctor.firstname} {doctor.lastname}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" marginTop="4px">
                    Speciality: {doctor.speciality}
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" marginTop="8px">
                    <Rating value={doctor.rating} readOnly precision={0.5} />
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" marginTop="4px">
                    Address: {doctor.address}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" marginTop="4px">
                    Consultation Fees: {doctor.fees}
                </Typography>
                <Box display="flex" justifyContent="center" marginTop="16px">
                    <Link to={`/doctorprofile/${doctor.id}`}>
                        <Button variant="contained" color="primary">
                            View Profile
                        </Button>
                    </Link>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DoctorProfileCard;
