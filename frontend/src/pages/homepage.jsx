import React from "react";
import '../App.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const HomePage = () => {
    return(
        <>
            <Navbar />
            <div className="div-4">
            </div>
            <div className="div-5">
                <div className="div-6">Exam 1</div>
                
                <div className="div-13">
                    <div className="div-7">
                    <img
                        loading="lazy"
                        srcSet="icons8-person-32.png"
                        className="img-3"
                    />
                    <div className="div-8">IBM</div>
                    </div>
                    <div className="div-9">
                    <img
                        loading="lazy"
                        srcSet="icons8-money-50.png"
                        className="img-3"
                    />
                    <div className="div-10">20EGP</div>
                    </div>
                    <div className="div-11">
                    <img
                        loading="lazy"
                        srcSet="icons8-money-50.png"
                        className="img-4"
                    />
                    <div className="div-12">15EGP</div>
                    </div>
                    <div className="div-14">
                    <img
                        loading="lazy"
                        src="location_pin.png"
                        className="img-4"
                    />
                    <div className="div-15">New Cairo</div>
                    </div>
                    <div className="div-16">
                    <img
                        loading="lazy"
                        src="clock.png"
                        className="img-6"
                    />
                    <div className="div-17">28/5/2024 13:00</div>
                    </div>
                    <div className="div-18">
                    <img
                        loading="lazy"
                        src="clock.png"
                        className="img-7"
                    />
                    <div className="div-19">28/5/2024 16:00</div>
                    </div>
                    <Button className="div-20" variant="success">Reserve</Button>
                </div>
            </div>
        </>
    )
}

export default HomePage;