import React, {useState, useEffect} from "react";
import '../App.css';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState([]);


    async function handleAddImgClick(){
        navigate('/addExam')
    }

    return(
        <>
            <div className="div">
                <div className="div-2">
                <img
                    loading="lazy"
                    srcSet="/logo2.jpg"
                    className="img-2"
                    alt="img"
                />
                <div className="div-3">Exam Center</div>
                {
                    !isLoggedIn ?
                    <Link to="/login" className="navbar-link">Login</Link>
                    : <Link to="/profile" className="navbar-link">{loggedUser.UserName}</Link>
                }
                <img
                    loading="lazy"
                    srcSet="/add.png"
                    className="addImg"
                    alt="img"
                    onClick={handleAddImgClick} // Make the image clickable
                />
                </div>
            </div>
        </>
    )
};

export default Navbar;