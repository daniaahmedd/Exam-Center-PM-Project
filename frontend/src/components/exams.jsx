import React, { useState, useEffect } from "react";
import '../App.css';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"; 

const Exams = () => {
    const [exams, setExams] = useState([]);
    let navigate = useNavigate();

    async function getExams() {
        try {
            const response = await axios.post('http://localhost:3000/api/exams/getExams', {
                withCredentials: true
            });
            setExams(response.data);
        } catch (error) {
            console.error("Error fetching exams:", error);
        }
    }

    const navigateVerify = (examId) => {
        navigate(`/verifyUser/${examId}`);
    };

    useEffect(() => {
        getExams();
    }, []); // Fetch exams only once when the component mounts

    return (
        <>
            {exams.map((exam) => {
                return (
                    <div className="div-5" key={exam._id}>
                        <div className="div-6">
                            {exam.ExamName}
                        </div>

                        <div className="div-13">
                            <div className="div-7">
                                <img
                                    loading="lazy"
                                    srcSet="icons8-person-32.png"
                                    className="img-3"
                                    alt="Person Icon"
                                />
                                <div className="div-8">
                                    {exam.ExamProvider}
                                </div>
                            </div>
                            <div className="div-9">
                                <div className="div-14">
                                    <img
                                        loading="lazy"
                                        src="location_pin.png"
                                        className="img-4"
                                        alt="Location Icon"
                                    />
                                    <div className="div-15">
                                        {exam.ExamLocation}
                                    </div>
                                </div>
                                <div className="div-16">
                                    <img
                                        loading="lazy"
                                        src="clock.png"
                                        className="img-6"
                                        alt="Clock Icon"
                                    />
                                    <div className="div-17">{exam.ExamStartTime}</div>
                                </div>
                                <div className="div-18">
                                    <img
                                        loading="lazy"
                                        src="clock.png"
                                        className="img-7"
                                        alt="Clock Icon"
                                    />
                                    <div className="div-19">{exam.ExamEndTime}</div>
                                </div>
                                <Button
                                    className="div-20"
                                    variant="success"
                                    onClick={() => navigateVerify(exam._id)}
                                >
                                    Reserve
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
};

export default Exams;
