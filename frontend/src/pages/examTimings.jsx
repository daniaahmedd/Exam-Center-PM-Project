import React from "react";
import '../styles/examTimingStyle.css';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from "react-router-dom"; 
import Navbar from "../components/navbar";
import '../App.css';

const ExamTimings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { examDetails } = location.state; // Assuming examDetails is passed through navigation state

  const navigateVerify = (examId) => {
    navigate(`/verifyUser/${examId}`);
  };

  return (
    <>
      <Navbar />
    <div className="exam-times">
      <div className="exam-name">
         {examDetails.ExamName} Exam Timings
      </div>
      <div>
        {examDetails.ExamTimes.map((timing, index) => (
          <React.Fragment key={index}>
            <div className="div-16">
              <img
                loading="lazy"
                src="clock.png"
                className="img-6"
                alt="Clock Icon"
              />
              <div className="div-17">    {new Date(timing.ExamStartTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date(timing.ExamEndTime).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </div>
            </div>
            <div className="div-18">
              <img
                loading="lazy"
                src="clock.png"
                className="img-7"
                alt="Clock Icon"
              />
              <div className="div-19">    {new Date(timing.ExamEndTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date(timing.ExamEndTime).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </div>
            </div>
            <Button
              className="div-20"
              variant="success"
              onClick={() => navigateVerify(examDetails._id)}
            >
              Reserve
            </Button>
          </React.Fragment>
        ))}
      </div>
      </div>
    </>
  );
}

export default ExamTimings;