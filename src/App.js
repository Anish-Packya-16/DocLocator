import { Container } from '@mui/material';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';

import AboutUs from './components/Aboutus';
import AdminPortal from './components/AdminPortal';
import BookAppointmentPage from './components/BookAppointmentPage';
import DoctorDetailsPage from './components/DoctorDetailsPage';
import DoctorProfilePage from './components/DoctorProfilePage';
import Footer from './components/Footer';
import HomePage from './components/Home';
import LoginPage from './components/login';
import Navbar from './components/navbar';
import Register from './components/register';
import ResultsPage from './components/ResultPage';
import PaymentPage from './components/payment';

function App() {
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    setUserData(null);
  };

  return (
    <div className="App">
      <Router>
        <NavbarContainer userData={userData} onLogout={handleLogout} />
        <Container style={{ paddingTop: '20px', paddingBottom: '100px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/loginpage" element={<LoginPage setUserData={setUserData} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/result" element={<ResultsPage />} />
            <Route path="/resultdoc" element={<doc />} />
            <Route path="/doctorprofile/:doctorId" element={<DoctorProfilePage />} />
            <Route path="/doctordetails/:doctorId" element={<DoctorDetailsPage />} />
            <Route path="/book-appointment/:doctorId" element={<BookAppointmentPage />} />
            <Route path="/payment/:doctorId" element={<PaymentPage/>} />
            <Route path="/admin/*" element={<AdminPortal />} />
          </Routes>
        </Container>
        <FooterContainer />
      </Router>
    </div>
  );
}

function NavbarContainer({ userData, onLogout }) {
  const location = useLocation();
  const noNavbarPaths = ['/admin'];

  return !noNavbarPaths.some(path => location.pathname.startsWith(path)) ? (
    <Navbar userData={userData} onLogout={onLogout} />
  ) : null;
}

function FooterContainer() {
  const location = useLocation();
  const noFooterPaths = ['/loginpage', '/register', '/admin'];

  return !noFooterPaths.some(path => location.pathname.startsWith(path)) ? <Footer /> : null;
}

export default App;
