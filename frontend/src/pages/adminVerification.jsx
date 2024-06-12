import Navbar from "../components/adminNavbar";
import { useState } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';
import '../styles/adminVerification.css';


export default function AdminVerification(){
    const [users, setUsers] = useState([
        {
            name: "Mohamed",
            ID:"30305018025",
            email:"mohaemd00@gmail.com",
            verified:''
        },
        {
            name: "Omar",
            ID:"2020585282",
            email:"omar123@gmail.com",
            verified:''
        },
        {
            name: "Ahmed",
            ID:"3030501825",
            email:"ahmed00@gmail.com",
            verified:''
        },
        {
            name: "Yehia",
            ID:"530305501825",
            email:"yehia00@gmail.com",
            verified:''
        },
        {
            name: "Mazen",
            ID:"13030501825",
            email:"mazen530@gmail.com",
            verified:''
        },
        {
            name: "Ali",
            ID:"23030501825",
            email:"ali00@gmail.com",
            verified:''
        }
    ])

    return(
        <>
        <Navbar/>
        <div className='user--verification--screen--div'>
        {users.map((user) => {
            return(

            user.verified === ''?
            <div className='user--verification--div'>    

                
                    <h1>Name : <span style={{color:'#262626'}}>{user.name}</span></h1>
                    <h2>National ID : <span style={{color:'#262626'}}>{user.ID}</span></h2>
                    <h2>Email : <span style={{color:'#262626'}}>{user.email}</span></h2>
                
                <div className='button--div'>
                <Button className ='approve--button' variant="success" onClick={()=>{
                    setUsers(users.map((User) => {
                        if(user.ID === User.ID){
                            User.verified = 'Approved'
                        }
                        return User
                    }))
                }} >Verify</Button>
                <Button className ='reject--button' variant="danger" onClick={()=>{
                    setUsers(users.map((User) => {
                        if(user.ID === User.ID){
                            User.verified = 'Rejected'
                        }
                        return User
                    }))
                }} >Reject</Button>
                </div>
                </div>
            :
            <div className='user--verification--div'>    

            
                <h1>Name : <span style={{color:'#262626'}}>{user.name}</span></h1>
                <h2>National ID : <span style={{color:'#262626'}}>{user.ID}</span></h2>
                <h2>Email : <span style={{color:'#262626'}}>{user.email}</span></h2>
                <h2>Verification Status : <span style={{ color: user.verified === 'Approved' ? '#43ab32' : '#BC54CD' }}>{user.verified}</span></h2>


            </div> 
            
            )
        })}
        </div>
        </>
    )

}