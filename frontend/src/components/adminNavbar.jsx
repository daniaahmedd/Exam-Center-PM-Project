import React from "react";
import '../App.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    async function handleAddImgClick(){
        navigate('/addExam')
    }

    return(
        <>
            <div className="div">
                <div className="div-2">
                <img
                    loading="lazy"
                    srcSet="logo2.jpg"
                    className="img-2"
                    alt="img"
                />
                <div className="div-3">Admin Verification</div>
                </div>
            </div>
        </>
    )
};

export default Navbar;