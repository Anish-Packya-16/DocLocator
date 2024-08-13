import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorProfileCard from './DoctorProfileCard'; // Adjust the path as needed
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './ResultsPage.css';

const ResultsPage = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/add/getdoc')
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the doctors!', error);
            });
    }, []);

    return (
        <div className="results-page">
            <div className="filter-bar">
                <input type="text" placeholder="Location" />
                <input type="text" placeholder="Search by condition or doctor" />
                <button>Search</button>
            </div>
            <div className="map-and-results-container">
                <MapContainer center={[11.0168, 76.9558]} zoom={13} style={{ height: '100vh', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    />
                    {doctors.map((doctor, index) => (
                        doctor.location && doctor.location.lat && doctor.location.lng ? (
                            <Marker key={index} position={[doctor.location.lat, doctor.location.lng]}>
                                <Popup>
                                    <div>
                                        <h2>{doctor.firstname} {doctor.lastname}</h2>
                                        <p>{doctor.speciality}</p>
                                        <p>Rating: {doctor.review}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ) : null
                    ))}
                </MapContainer>
                <div className="doctor-profile-cards">
                    {doctors.map(doctor => (
                        <DoctorProfileCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;
