import {
  AccessTime,
  CalendarToday,
  LocationOn,
  Person,
  School,
  Star,
  AttachMoney,
  QuestionAnswer,
  RateReview,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoctorProfilePage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [patientStories, setPatientStories] = useState([]);
  const [qaMessages, setQaMessages] = useState([]);
  const [qaInput, setQaInput] = useState("");
  const [storyInput, setStoryInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://localhost:8080/add/getdoc/${doctorId}`)
        .then((response) => {
          setDoctor(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the doctor's details!", error);
        });
    } else {
      console.error("Doctor ID is undefined");
    }
  }, [doctorId]);

  const handleDayChange = (date) => {
    setSelectedDay(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleBookAppointment = () => {
    if (selectedDay && selectedTime) {
      navigate(`/book-appointment/${doctorId}`, {
        state: {
          selectedDay: selectedDay.toISOString().split('T')[0], // Format date to 'yyyy-MM-dd'
          selectedTime,
          doctorName: doctor.firstname + " " + doctor.lastname,
        },
      });
    } else {
      alert("Please select a day and time");
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleQaSubmit = () => {
    if (qaInput.trim()) {
      setQaMessages([...qaMessages, { text: qaInput, type: "question" }]);
      setQaInput(""); // Reset the input field
    }
  };

  const handleStorySubmit = () => {
    if (storyInput.trim()) {
      setPatientStories([...patientStories, storyInput]);
      setStoryInput(""); // Reset the input field
    }
  };

  if (!doctor) {
    return (
      <Typography variant="h6" color="textSecondary">
        Loading...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "background.default",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Card
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card>
              <CardContent>
                {doctor.imageUrl ? (
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.firstname || "Doctor"}
                    style={{
                      width: "100%",
                      maxWidth: 150,
                      height: "auto",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <Person sx={{ fontSize: 100, color: "#9e9e9e" }} />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography
              variant="h4"
              sx={{ color: "primary.main" }}
              gutterBottom
            >
              {doctor.firstname || "N/A"} {doctor.lastname || "N/A"}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "secondary.main", fontStyle: "italic" }}
              gutterBottom
            >
              {doctor.speciality || "N/A"}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <Star color="primary" /> {doctor.rating || "N/A"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <LocationOn color="action" /> {doctor.address || "N/A"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <School color="action" /> {doctor.education || "N/A"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <AttachMoney color="action" /> Consultation Fee: ₹
                {doctor.fees || "N/A"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="Consult Q&A" />
          <Tab label="Patient Stories" />
        </Tabs>

        {activeTab === 0 && (
          <Box
            sx={{
              p: 3,
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 2,
              display: "flex",
              flexDirection: "column",
              height: "300px",
              overflowY: "scroll",
            }}
          >
            <Typography variant="h5" gutterBottom>
              <QuestionAnswer /> Consult Q&A
            </Typography>
            <List sx={{ mb: 2 }}>
              {qaMessages.map((msg, index) => (
                <ListItem key={index}>
                  <Avatar>{msg.type === "question" ? "Q" : "A"}</Avatar>
                  <ListItemText
                    primary={msg.text}
                    sx={{
                      textAlign: msg.type === "question" ? "left" : "right",
                    }}
                  />
                </ListItem>
              ))}
            </List>
            <TextField
              placeholder="Ask a question for free"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              value={qaInput}
              onChange={(e) => setQaInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: "100%" }}
              onClick={handleQaSubmit}
            >
              Submit
            </Button>
          </Box>
        )}

        {activeTab === 1 && (
          <Box
            sx={{
              p: 3,
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 2,
              display: "flex",
              flexDirection: "column",
              height: "300px",
              overflowY: "scroll",
            }}
          >
            <Typography variant="h5" gutterBottom>
              <RateReview /> Patient Stories
            </Typography>
            <List sx={{ mb: 2 }}>
              {patientStories.map((story, index) => (
                <ListItem key={index}>
                  <ListItemText primary={story} />
                </ListItem>
              ))}
            </List>
            <TextField
              placeholder="Share your story"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              value={storyInput}
              onChange={(e) => setStoryInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: "100%" }}
              onClick={handleStorySubmit}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Card sx={{ flex: 1, mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <CalendarToday /> Select Day
            </Typography>
            <DatePicker
              selected={selectedDay}
              onChange={handleDayChange}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              placeholderText="Select a day"
              customInput={<TextField fullWidth variant="outlined" />}
            />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, ml: { sm: 2 } }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <AccessTime /> Select Time
            </Typography>
            <Select
              value={selectedTime}
              onChange={handleTimeChange}
              fullWidth
              variant="outlined"
            >
              {/* Example time slots */}
              <MenuItem value="09:00">09:00 AM</MenuItem>
              <MenuItem value="10:00">10:00 AM</MenuItem>
              <MenuItem value="11:00">11:00 AM</MenuItem>
              <MenuItem value="12:00">12:00 PM</MenuItem>
              <MenuItem value="13:00">01:00 PM</MenuItem>
              <MenuItem value="14:00">02:00 PM</MenuItem>
              <MenuItem value="15:00">03:00 PM</MenuItem>
              <MenuItem value="16:00">04:00 PM</MenuItem>
              <MenuItem value="17:00">05:00 PM</MenuItem>
            </Select>
          </CardContent>
        </Card>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4, width: "100%" }}
        onClick={handleBookAppointment}
      >
        Book Appointment
      </Button>
    </Box>
  );
};

export default DoctorProfilePage;
