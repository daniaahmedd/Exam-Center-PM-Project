import React from "react";
import { useState, useEffect } from "react";
import '../App.css';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";

const VerifyUserNationality = () => {
    const [exams, setExams] = useState([]);

    async function getExams() {
        const response = await axios.post('http://localhost:3000/api/exams/getExams', {
            withCredentials: true
        });
        setExams(response.data)
        console.log('Exam value =>', exams)
    }

    useEffect(() => {
        getExams()

    }, [exams])

    return (
        <>
            <Navbar />
            {exams.map((exam) => {
                return (
                    <div className="div-5">
                        <div className="div-6">
                            {exam.ExamName}
                        </div>

                        <div className="div-13">
                            <div className="div-7">
                                <img
                                    loading="lazy"
                                    srcSet="icons8-person-32.png"
                                    className="img-3"
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
                                    />
                                    <div className="div-17">{exam.ExamStartTime}</div>
                                </div>
                                <div className="div-18">
                                    <img
                                        loading="lazy"
                                        src="clock.png"
                                        className="img-7"
                                    />
                                    <div className="div-19">{exam.ExamEndTime}</div>
                                </div>
                                <Button className="div-20" variant="success" onClick={() => {
                                    <VerifyUserNationality />
                                }}>Reserve</Button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
};

export default VerifyUserNationality;