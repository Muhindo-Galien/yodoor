import React from "react";
import "./contact.css";
import shake from "../../assets/shake.svg";

const Contact = () => {
  return (
    <section className="contact">
      <h1 className="heading">
        Contact <span>us</span>
      </h1>
      <div className="row">
        <div className="shake">
          <img src={shake} alt="shake" />
        </div>

        <form action="">
          <h3>get in touch</h3>
          <div className="inputBox">
            <span className="fas fa-user"></span>
            <input type="text" placeholder="name"></input>
          </div>
          <div className="inputBox">
            <span className="fas fa-envelope"></span>
            <input type="text" placeholder="email"></input>
          </div>
          <div className="inputBox">
            <span className="fas fa-phone"></span>
            <input type="text" placeholder="phone"></input>
          </div>
          <input type="submit" value="contact Now" className="btn"></input>
        </form>
      </div>
    </section>
  );
};

export default Contact;
