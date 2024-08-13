import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Box className="section-container">
        <Grid container spacing={2} className="section">
          <Grid item xs={12} sm={6} className="section-text">
            <Typography variant="h4" gutterBottom>Our Mission</Typography>
            <Typography variant="body1" paragraph>
              There's this notion that to grow a business, you have to be ruthless. But we know there's a better way to grow. One where what's good for the bottom line is also good for customers. We believe businesses can grow with a conscience, and succeed with a soul – and that they can do it with care and dedication. That's why we've created an ecosystem uniting software, education, and community to help healthcare services grow better every day.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className="section-image">
            <Card>
              <CardContent>
                <img src="https://i.pinimg.com/564x/19/de/2e/19de2e8d002ea3d9a074d1e8d280de69.jpg" alt="Founders" className="founders-image" />
                <Typography variant="body2" align="center">Dr. John Doe & Dr. Jane Smith</Typography>
                <Typography variant="body2" align="center">Co-founders</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box className="section-container">
        <Grid container spacing={2} className="section">
          <Grid item xs={12} sm={6} className="section-image">
            <Card>
              <CardContent>
                <img src="https://i.pinimg.com/736x/19/d7/0c/19d70c65f68785f7e60864e589264118.jpg" alt="Story" className="story-image" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} className="section-text">
            <Typography variant="h4" gutterBottom>Our Story</Typography>
            <Typography variant="body1" paragraph>
              As fellow graduate students at MIT in 2004, John and Jane noticed a shift in the way people access healthcare services. Consumers were no longer tolerating outdated methods for booking appointments and seeking medical advice – in fact, they'd gotten really, really good at ignoring them. 
            </Typography>
            <Typography variant="body1" paragraph>
              Recognizing this, John and Jane set out to transform the healthcare industry by developing a platform that offers seamless appointment booking, virtual consultations, and comprehensive patient management. Their journey from students to founders has been driven by a singular vision: to make healthcare more accessible, efficient, and patient-centered.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AboutUs;
