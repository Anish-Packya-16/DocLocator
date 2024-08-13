import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import './DoctorDetailsPage.css';

const doctors = [
  {
    name: 'Dr. Benjamin Thornton, MD',
    specialty: 'OB-GYN',
    rating: 4.81,
    reviews: 113,
    address: '635 Madison Ave, 6th Fl, New York, NY 10022',
    imageUrl: 'https://i.pinimg.com/236x/be/99/e8/be99e81f041680679a70fbe0b39a3d65.jpg',
    biography: 'Dr. Benjamin Thornton is an experienced OB-GYN with over 20 years of experience in women\'s health...',
    education: 'Harvard Medical School, 1995',
    experience: '20 years in practice at New York General Hospital',
    reviewsList: [
      {
        patientName: 'Jane Doe',
        date: '2023-06-01',
        rating: 5,
        comment: 'Dr. Thornton is an amazing doctor. He was very thorough and caring.',
      },
      {
        patientName: 'John Smith',
        date: '2023-05-20',
        rating: 4.5,
        comment: 'Great experience. The doctor was very professional and knowledgeable.',
      },
    ],
  },
  // Add other doctor objects here
  {
    name: 'Dr. Sarah Lee, MD',
    specialty: 'Cardiologist',
    rating: 4.90,
    reviews: 200,
    address: '123 Health St, New York, NY 10001',
    imageUrl: 'https://i.pinimg.com/236x/54/ef/b9/54efb92b7b1fdc2b3b12d3c436fd520f.jpg',
    biography: 'Dr. Sarah Lee specializes in cardiology with over 15 years of experience...',
    education: 'Johns Hopkins University, 2008',
    experience: '15 years in practice at NY Heart Clinic',
    reviewsList: [
      {
        patientName: 'Alice Johnson',
        date: '2023-07-15',
        rating: 5,
        comment: 'Excellent care and very knowledgeable!',
      },
    ],
  }
];

const DoctorDetailsPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]); // Default to the first doctor

  return (
    <div className="doctor-details-page">
      <Box className="details-container">
        <Card className="details-card">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} className="doctor-image-container">
                <Avatar
                  src={selectedDoctor.imageUrl}
                  alt={selectedDoctor.name}
                  sx={{ width: 200, height: 200, borderRadius: '50%' }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h4">{selectedDoctor.name}</Typography>
                <Typography variant="h6">{selectedDoctor.specialty}</Typography>
                <Rating value={selectedDoctor.rating} readOnly />
                <Typography variant="body1">({selectedDoctor.reviews} reviews)</Typography>
                <Typography variant="body1">{selectedDoctor.address}</Typography>
                <Typography variant="body2" paragraph>{selectedDoctor.biography}</Typography>
                <Typography variant="body2"><SchoolIcon /> {selectedDoctor.education}</Typography>
                <Typography variant="body2"><WorkIcon /> {selectedDoctor.experience}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Link to="/doctorprofile" style={{ textDecoration: 'none', width: '100%' }}>
              <Button
                variant="contained"
                color="primary"
                className="book-appointment-button"
                fullWidth
              >
                Book Appointment
              </Button>
            </Link>
          </CardActions>
        </Card>
        <Box className="reviews-container">
          <Typography variant="h5" gutterBottom>Patient Reviews</Typography>
          <Grid container spacing={2}>
            {selectedDoctor.reviewsList.map((review, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card className="review-card">
                  <CardContent>
                    <Typography variant="h6">{review.patientName}</Typography>
                    <Rating value={review.rating} readOnly />
                    <Typography variant="body2">{review.date}</Typography>
                    <Typography variant="body2">{review.comment}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default DoctorDetailsPage;