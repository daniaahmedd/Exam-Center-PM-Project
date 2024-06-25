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

    const navigateToExamTimings = (examDetails) => {
        navigate('/exam-timings', { state: { examDetails } });
      };

    useEffect(() => {
        getExams();
        setExams([
            {
              ExamName: "Software Engineering Fundamentals",
              ExamProvider: "Tech University",
              ExamFeesForeigners: "200",
              ExamFeesLocals: "150",
              ExamLocation: "Online",
              ExamTimes: [
                {
                  ExamStartTime: new Date("2023-05-15T09:00:00Z"),
                  ExamEndTime: new Date("2023-05-15T12:00:00Z")
                },
                {
                  ExamStartTime: new Date("2023-05-16T09:00:00Z"),
                  ExamEndTime: new Date("2023-05-16T12:00:00Z")
                }
              ],
              ExamSeats: 50,
              isAvailable: true
            },
            {
              ExamName: "Data Structures and Algorithms",
              ExamProvider: "Code Academy",
              ExamFeesForeigners: "250",
              ExamFeesLocals: "200",
              ExamLocation: "Campus A",
              ExamTimes: [
                {
                  ExamStartTime: new Date("2023-06-20T10:00:00Z"),
                  ExamEndTime: new Date("2023-06-20T13:00:00Z")
                },
                {
                  ExamStartTime: new Date("2023-06-21T10:00:00Z"),
                  ExamEndTime: new Date("2023-06-21T13:00:00Z")
                }
              ],
              ExamSeats: 30,
              isAvailable: true
            },
            {
              ExamName: "Introduction to Cybersecurity",
              ExamProvider: "Global Institute",
              ExamFeesForeigners: "300",
              ExamFeesLocals: "250",
              ExamLocation: "Campus B",
              ExamTimes: [
                {
                  ExamStartTime: new Date("2023-07-25T14:00:00Z"),
                  ExamEndTime: new Date("2023-07-25T17:00:00Z")
                },
                {
                  ExamStartTime: new Date("2023-07-26T14:00:00Z"),
                  ExamEndTime: new Date("2023-07-26T17:00:00Z")
                }
              ],
              ExamSeats: 40,
              isAvailable: false
            }
          ])
    }, []); // Fetch exams only once when the component mounts

    return (
        <>
            {exams.map((exam) => {
                return (
                    <div className="div-5" key={exam._id} onClick={() => navigateToExamTimings(exam) } >                   
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
                                {/* <div className="div-16">
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
                                </Button> */}
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
};

export default Exams;
