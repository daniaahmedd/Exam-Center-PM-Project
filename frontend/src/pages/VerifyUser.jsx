import React, { useState, useEffect } from "react";
import '../App.css';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from "axios";

const VerifyUser = () => {
    const { examId } = useParams();
    const [isForeigner, setIsForeigner] = useState(false);
    const [finalPrice, setFinalPrice] = useState(0.0);

    const handleOptionChange = (event) => {
        setIsForeigner(event.target.value === 'foreigner');
    };

    const showPrice = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/exams/getExam', {
                "examId": examId
            },
            {
                withCredentials: true
            });
            if (isForeigner) {
                setFinalPrice(response.data.ExamFeesForeigners);
                console.log(finalPrice)
            } else {
                setFinalPrice(response.data.ExamFeesLocals);
            }
        } catch (error) {
            console.error("Error fetching the price:", error);
        }
    }

    const bookExam = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/exams/bookExam', {
                "examId": examId
            },
            {
                withCredentials: true
            });
            if (response.data == "Exam booked successfully") {
                alert(response.data);
            } else {
                alert(response.data);
            }
        } catch (error) {
            console.log(error)
            alert(error.response.data);

        }
    }

    useEffect(() => {
        setFinalPrice(0.0);
    }, [isForeigner]);

    return (
        <>
            <Navbar />
            <div className="container" style={{ marginLeft: '20px' }}>
                <h2 style={{ color: '#43ab32', fontSize: '30px' }}>Upload Document</h2>
                <div className="options">
                    <label>
                        <input
                            type="radio"
                            value="foreigner"
                            checked={isForeigner}
                            onChange={handleOptionChange}
                        />
                        Foreigner
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="non-foreigner"
                            checked={!isForeigner}
                            onChange={handleOptionChange}
                        />
                        Non-Foreigner
                    </label>
                </div>

                {isForeigner ? (
                    <div className="upload-section">
                        <h3>Upload Passport</h3>
                        <input type="file" accept="image/*" />
                    </div>
                ) : (
                    <div className="upload-section">
                        <h3>Upload National ID</h3>
                        <input type="file" accept="image/*" />
                    </div>
                )}
                <Button onClick={showPrice}>Next</Button>
                {finalPrice != 0 && (
                    <>
                        <h2 style={{ color: '#43ab32', fontSize: '30px' }}>Your final price is: {finalPrice}</h2>
                        <Button onClick={bookExam}>Confirm Booking</Button>
                    </>
                )}
            </div>
        </>
    );
}

export default VerifyUser;
