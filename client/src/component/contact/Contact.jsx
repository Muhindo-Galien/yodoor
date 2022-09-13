import React from "react";
import "./contact.css";
import shake from "../../assets/shake.svg";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { useAlert } from "react-alert";

const Contact = () => {
      const formRef = useRef();
      const alert = useAlert();

      const handleSubmit = (e) => {
        e.preventDefault();
        emailjs
          .sendForm(
            "service_dz4wai4",
            "template_3k5oxtm",
            formRef.current,
            "k6KAWnR4eQwI_hNZh"
          )
          .then(
            (result) => {
              console.log(result.text);
              window.location.reload();
              alert.success("Message sent successfully!");
            },
            (error) => {
              console.log(error.text);
              alert.success("Message was not sent!");

            }
          );
      };
  return (
    <section className="contact">
      <h1 className="heading">
        Contact <span>us</span>
      </h1>
      <div className="row">
        <div className="shake">
          <img src={shake} alt="shake" />
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          <h3>get in touch</h3>
          <div className="inputBox">
            {/* <i class="fa-sharp fa-solid fa-satellite-dish"></i> */}
            <span className="fa-sharp fa-solid fa-satellite-dish"></span>
            <input
              type="text"
              placeholder="subject"
              id="subject"
              name="subject"
            ></input>
          </div>
          <div className="inputBox">
            <span className="fas fa-envelope"></span>
            <input
              type="text"
              placeholder="email"
              id="email"
              name="email"
            ></input>
          </div>
          <div className="inputBox">
            <span className="fa-solid fa-message"></span>
            <input
              type="text"
              placeholder="message"
              id="msg"
              name="message"
            ></input>
          </div>
          <input type="submit" value="contact Now" className="btn"></input>
        </form>
      </div>
    </section>
  );
};

export default Contact;
