import React, { useState, useEffect } from "react";
import '../App.css';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";

const Exams = () => {
    const [exams, setExams] = useState([]);
    const [error, setError] = useState(null);
    let navigate = useNavigate();
    let { username } = useParams();

    async function getExams() {
        try {
            console.log('username =>', username);
            const response = await axios.post(
                `http://localhost:3000/api/exams/getUserBooking/${username}`,
                {},
                { withCredentials: true }  // Corrected placement of withCredentials
            );

            // Gather all exam data
            const examPromises = response.data.exam.map(async (exam) => {
                const examResponse = await axios.post('http://localhost:3000/api/exams/getExamByName', {
                    examName: exam.ExamName
                }, {
                    withCredentials: true
                });
                return examResponse.data;
            });

            // Wait for all exam data to be fetched
            const examsDataNested = await Promise.all(examPromises);

            // Flatten the array of arrays
            const examsData = examsDataNested.flat();

            setExams(examsData);
            console.log('exams => ', examsData);
        } catch (error) {
            console.error("Error fetching exams:", error);
            setError(error.response?.data?.message || 'Error fetching exams');
        }
    }

    const navigateReschedule = (examId) => {
        navigate(`/reschedule/${examId}`);
    };

    useEffect(() => {
        getExams();
    }, []); // Fetch exams only once when the component mounts

    return (
        <>
            {error && <div className="error-message">{error}</div>}
            {exams.map((exam) => {
                return (
                    <div className="div-5" key={exam._id || exam.ExamName}>
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
                                    onClick={() => navigateReschedule(exam._id)}
                                >
                                    Reschedule
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
