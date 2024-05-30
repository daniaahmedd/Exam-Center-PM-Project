import React from "react";
import { Route, Routes } from "react-router-dom";
import AddExam from "./pages/addExam";
import HomePage from "./pages/homepage";
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addExam" element={<AddExam />} />
      </Routes>
    </>
  );
}

export default App;
