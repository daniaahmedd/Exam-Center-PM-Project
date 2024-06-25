import React, { useState } from 'react';
import axios from 'axios';
import '../stylesheet.css';
import { useNavigate, useParams } from "react-router-dom";

const acceptableReasons = ['Medical Emergency', 'Family Emergency', 'Work Conflict', 'Other'];

function RescheduleExam() {
  const [newDate, setNewDate] = useState('');
  const [reason, setReason] = useState(acceptableReasons[0]);
  const [message, setMessage] = useState('');
  const [fee, setFee] = useState(null);
  let { examId } = useParams();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/exams/reschedule', {
        examId,
        newDate,
        reason,
      });

      setMessage(response.data.message);
      setFee(response.data.fee);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error rescheduling exam');
      setFee(null);
    }
  };

  return (
    <div className="App">
      <h1>Reschedule Exam</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Date:</label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reason:</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            {acceptableReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Reschedule</button>
      </form>
      {message && (
        <div className="message">
          <p>{message}</p>
          {fee !== null && <p>Rescheduling Fee: ${fee}</p>}
        </div>
      )}
    </div>
  );
}

export default RescheduleExam;
