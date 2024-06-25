import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddExam from "./pages/addExam";
import HomePage from "./pages/homepage";
import VerifyUser from "./pages/VerifyUser";
import AdminVerification from "./pages/adminVerification";
import Login from "./pages/reg";
import './App.css';
import ExamTimings from "./pages/examTimings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addExam" element={<AddExam />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyUser/:examId" element={<VerifyUser />} />
        <Route path="/adminVerification" element={<AdminVerification />} />
        <Route path='/exam-timings' element={<ExamTimings />} /> 
      </Routes>
    </>
  );
}

export default App;
