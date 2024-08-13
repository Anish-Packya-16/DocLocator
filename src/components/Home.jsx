import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for condition: ${condition} in location: ${location}`);
    // Add your search logic here
  };

  const topDoctors = [
    {
      name: 'Dr. John Doe',
      specialty: 'Cardiologist',
      image: 'https://i.pinimg.com/736x/89/05/33/890533b620229edf5e98513c9f5dd9cd.jpg'
    },
    {
      name: 'Dr. Jane Smith',
      specialty: 'Dentist',
      image: 'https://i.pinimg.com/564x/4a/0f/0e/4a0f0e8c3018159e2e5d025215887fe9.jpg'
    },
    {
      name: 'Dr. Emily Johnson',
      specialty: 'Dermatologist',
      image: 'https://i.pinimg.com/564x/eb/18/12/eb1812a1d59da3a32f70429dfa35b2fb.jpg'
    }
  ];

  const articles = [
    {
      title: 'Healthy Living Tips',
      description: 'Learn how to maintain a healthy lifestyle with these tips.',
      image: 'https://i.pinimg.com/236x/2f/5e/31/2f5e3116cef91b17e65e2e35296b29ca.jpg'
    },
    {
      title: 'The Importance of Regular Checkups',
      description: 'Regular health checkups can help find problems before they start.',
      image: 'https://i.pinimg.com/236x/90/d1/6d/90d16dfbfaedcc307a59d9c1cb5aed61.jpg'
    },
    {
      title: 'Nutrition and Diet',
      description: 'Understand the importance of a balanced diet.',
      image: 'https://i.pinimg.com/236x/6f/ad/45/6fad457bd08cb7fb4eb1f365c3f2076e.jpg'
    }
  ];

  return (
    <div className="homepage-container">
      <div className="search-container">
        <h2>Find Specialists near you and Book</h2>
        <form onSubmit={handleSearch}>
          <div className="form-group location-group">
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
          </div>
          <div className="form-group condition-group">
            <input
              type="text"
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Search doctors, clinics, hospitals, etc."
            />
          </div>
          <Link to="/result">
            <button type="submit" className="search-button">Search</button>
          </Link>
        </form>
      </div>

      <div className="carousel-container">
        <h3>Top Doctors</h3>
        <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
          {topDoctors.map((doctor, index) => (
            <Paper key={index} className="carousel-item">
              <img src={doctor.image} alt={doctor.name} />
              <h4>{doctor.name}</h4>
              <p>{doctor.specialty}</p>
            </Paper>
          ))}
        </Carousel>
      </div>

      <div className="articles-container">
        <h3>Medical Articles</h3>
        <div className="articles-grid">
          {articles.map((article, index) => (
            <Card key={index} className="article-card">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={article.image}
                  alt={article.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Read More
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
