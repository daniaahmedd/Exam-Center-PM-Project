import React from "react";
import '../App.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Exams from "../components/exams";

const HomePage = () => {
    return(
        <>
            <Navbar />
            <Exams />
        </>
    )
}

export default HomePage;