import React from "react";
import { Route, Routes } from "react-router-dom";
import AddExam from "./pages/addExam";
import HomePage from "./pages/homepage";
import AdminVerification from "./pages/adminVerification";
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addExam" element={<AddExam />} />
        <Route path="/adminVerification" element={<AdminVerification />} />
      </Routes>
    </>
  );
}

export default App;
