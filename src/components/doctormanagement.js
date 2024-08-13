// Parent component
import React, { useState, useEffect } from 'react';
import ResultsPage from './ResultsPage';
import axios from 'axios';

const ParentComponent = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error("There was an error fetching the doctors!", error);
            }
        };

        fetchDoctors();
    }, []);

    return <ResultsPage doctors={doctors} />;
};

export default ParentComponent;
