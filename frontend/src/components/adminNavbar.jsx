import React from "react";
import '../App.css';

const Navbar = () => {

    return(
        <>
            <div className="div">
                <div className="div-2">
                <img
                    loading="lazy"
                    srcSet="logo2.jpg"
                    className="img-2"
                    alt="img"
                />
                <div className="div-3">Admin Verification</div>
                </div>
            </div>
        </>
    )
};

export default Navbar;