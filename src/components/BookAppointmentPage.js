import React, { useState } from "react";
import { Box, Button, TextField, Typography, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const BookAppointmentPage = () => {
  const location = useLocation();
  const { state } = location;
  const { doctorId } = useParams(); // Get doctorId from the URL params

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [modeOfConsultancy, setModeOfConsultancy] = useState("");
  const [patientcondition, setPatientcondition] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const appointment = {
      patientName,
      date: state.selectedDay,
      time: state.selectedTime,
      age,
      weight,
      contact,
      address,
      modeOfConsultancy,
      patientcondition,
      doctor: { id: doctorId }, // Include doctorId in the appointment data
    };

    axios.post("http://localhost:8080/appointments/addappointment", appointment)
      .then(response => {
        setPaymentDone(true);
        setTimeout(() => {
          window.location.href = `/payment/${doctorId}`;
        }, 2000);
      })
      .catch(error => {
        console.error("There was an error booking the appointment!", error);
      });
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundImage: "url('https://i.pinimg.com/564x/1f/02/0d/1f020df4474f108b3daea5b02f2a95f3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ 
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        maxWidth: 600,
        width: "100%",
        padding: 4,
        boxShadow: 3,
      }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Book Appointment
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Patient Name"
              variant="outlined"
              fullWidth
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              value={age}
              onChange={(e) => setAge(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Weight"
              variant="outlined"
              fullWidth
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Contact"
              variant="outlined"
              fullWidth
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel>Mode of Consultancy</InputLabel>
              <Select
                value={modeOfConsultancy}
                onChange={(e) => setModeOfConsultancy(e.target.value)}
                label="Mode of Consultancy"
              >
                <MenuItem value="clinic">Clinic Visit</MenuItem>
                <MenuItem value="home">Home Visit</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Patient Condition"
              variant="outlined"
              fullWidth
              value={patientcondition}
              onChange={(e) => setPatientcondition(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Proceed to Payment
            </Button>
            {paymentDone && (
              <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
                 Appointment booked, let's proceed to pay
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookAppointmentPage;
