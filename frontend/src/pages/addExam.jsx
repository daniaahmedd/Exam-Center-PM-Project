import Navbar from "../components/navbar";
import { useState } from "react";
import { Form, Button, Container } from 'react-bootstrap';
import axios from "axios";

export default function AddExam() {
    const [examDetails, setExamDetails] = useState({
        name: "",
        provider: "",
        feesForeigner: "",
        feesLocals: "",
        location: "",
        startTime: "",
        endTime: "",
        seats: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamDetails({
            ...examDetails,
            [name]: value
        });
    };

    async function handleaddexam(){
        console.log(examDetails.name)
        console.log(examDetails.provider)
        console.log(examDetails.feesForeigner)
        console.log(examDetails.feesLocals)
        console.log(examDetails.location)
        console.log(examDetails.startTime)
        console.log(examDetails.endTime)
        console.log(examDetails.seats)

        const response = await axios.post('http://localhost:3000/api/exams/new/examcenter', {
            examName: examDetails.name,
            examprovider:examDetails.provider,
            foreignerfees:examDetails.feesForeigner,
            localfees:examDetails.feesLocals,
            location:examDetails.location,
            starttime:examDetails.startTime,
            endtime:examDetails.endTime,
            examseats:examDetails.seats,
        },
        {
            withCredentials: true 
        });
        console.log('API DATA',response.data);

    }

    return (
        <>
            <Navbar />
            <Container>
                <Form>
                    <Form.Group controlId="examName">
                        <Form.Label>Exam Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            value={examDetails.name} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group controlId="examProvider">
                        <Form.Label>Exam Provider</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="provider" 
                            value={examDetails.provider} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group controlId="feesForeigner">
                        <Form.Label>Exam Fees (Foreigner)</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="feesForeigner" 
                            value={examDetails.feesForeigner} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group controlId="feesLocals">
                        <Form.Label>Exam Fees (Locals)</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="feesLocals" 
                            value={examDetails.feesLocals} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group controlId="examLocation">
                        <Form.Label>Exam Location</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="location" 
                            value={examDetails.location} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group controlId="startTime">
                        <Form.Label>Exam Start Time</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="startTime" 
                            value={examDetails.startTime} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group controlId="endTime">
                        <Form.Label>Exam End Time</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="endTime" 
                            value={examDetails.endTime} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group controlId="seats">
                        <Form.Label>Exam Seats</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="seats" 
                            value={examDetails.seats} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleaddexam}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}
