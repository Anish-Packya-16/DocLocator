import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Jan', users: 4000, doctors: 2400, appointments: 2400 },
  { name: 'Feb', users: 3000, doctors: 1398, appointments: 2210 },
  { name: 'Mar', users: 2000, doctors: 9800, appointments: 2290 },
  { name: 'Apr', users: 2780, doctors: 3908, appointments: 2000 },
  { name: 'May', users: 1890, doctors: 4800, appointments: 2181 },
  { name: 'Jun', users: 2390, doctors: 3800, appointments: 2500 },
  { name: 'Jul', users: 3490, doctors: 4300, appointments: 2100 },
];

const AdminDashboard1 = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome Admin
      </Typography>
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">1,200</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Doctors</Typography>
              <Typography variant="h4">320</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Appointments</Typography>
              <Typography variant="h4">1,500</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Statistics
              </Typography>
              <LineChart width={800} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
                <Line type="monotone" dataKey="doctors" stroke="#82ca9d" />
                <Line type="monotone" dataKey="appointments" stroke="#ffc658" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard1;
