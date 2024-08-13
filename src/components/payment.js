import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handlePayClick = () => {
    // Simulate payment process and show snackbar on success
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          padding: 4,
          maxWidth: 500,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Payment Information
          </Typography>
          <TextField
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="1234 5678 9123 4567"
          />
          <TextField
            label="Card Holder Name"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="John Doe"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              label="Expiry Date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="MM/YY"
              sx={{ mr: 1 }}
            />
            <TextField
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="123"
              sx={{ ml: 1 }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handlePayClick}
          >
            Pay
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Payment Done, Appointment Confirmed
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentPage;
