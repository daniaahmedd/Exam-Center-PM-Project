import * as React from "react";
import './App.css';

function App() {
  return (
    <>
      <div className="div">
        <div className="div-2">
            <img
              loading="lazy"
              srcSet="logo2.jpg"
              className="img-2"
              alt="img"
            />
          <div className="div-3">Exam Center</div>
        </div>
        <div className="div-4" />
        <div className="div-5">
          <div className="div-6">Exam 1</div>
          
          <div className="div-13">
            <div className="div-7">
              <img
                loading="lazy"
                srcSet="icons8-person-32.png"
                className="img-3"
              />
              <div className="div-8">IBM</div>
            </div>
            <div className="div-9">
              <img
                loading="lazy"
                srcSet="icons8-money-50.png"
                className="img-3"
              />
              <div className="div-10">20EGP</div>
            </div>
            <div className="div-11">
              <img
                loading="lazy"
                srcSet="icons8-money-50.png"
                className="img-4"
              />
              <div className="div-12">15EGP</div>
            </div>
            <div className="div-14">
              <img
                loading="lazy"
                src="location_pin.png"
                className="img-4"
              />
              <div className="div-15">New Cairo</div>
            </div>
            <div className="div-16">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4308afb63243fc42f1deee911387a078dbe51e006f9ccf567498a2f1a8729da?"
                className="img-6"
              />
              <div className="div-17">28/5/2024 13:00</div>
            </div>
            <div className="div-18">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a18b0a619f4aae2cdca09bafad521d3453363c9cc39ac3f4db18889062fc2426?"
                className="img-7"
              />
              <div className="div-19">28/5/2024 16:00</div>
            </div>
            <div className="div-20">Reserve</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;



