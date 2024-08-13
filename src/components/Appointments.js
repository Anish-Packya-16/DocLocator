import { Box, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/appointments/getAll");
        const appointmentsData = response.data;

        // Fetch doctor details for each appointment
        const updatedAppointments = await Promise.all(appointmentsData.map(async (appointment) => {
          try {
            const doctorResponse = await axios.get(`http://localhost:8080/add/getdoc/${appointment.doctor.id}`);
            appointment.doctorName = doctorResponse.data.firstname + " " + doctorResponse.data.lastname;
          } catch (doctorError) {
            console.error(`Failed to fetch doctor details for appointment ${appointment.id}: `, doctorError);
            appointment.doctorName = "Unknown Doctor";
          }
          return appointment;
        }));

        setAppointments(updatedAppointments);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch appointments: ", error);
        setError("Failed to fetch appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Mode of Consultancy</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Doctor Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.age}</TableCell>
                <TableCell>{appointment.weight}</TableCell>
                <TableCell>{appointment.contact}</TableCell>
                <TableCell>{appointment.address}</TableCell>
                <TableCell>{appointment.modeOfConsultancy}</TableCell>
                <TableCell>{appointment.patientcondition}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.doctorName}</TableCell> {/* Display the doctor's name */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AppointmentsPage;
