import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { allDays, isAlreadyBooked, read } from "../../redux/actions/hotel";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import emailjs from "emailjs-com";
import "./signleHotel.css";
import BtnSlider from "./BtnSlider";
import moment from "moment";
import { getSessionId } from "../../redux/actions/stripe";
import { loadStripe } from "@stripe/stripe-js";

const SingleHotel = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(false);
  let { hotelId } = useParams();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const [slideIndex, setSlideIndex] = useState(1);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };
  // DATA

  useEffect(() => {
    loadSellerHotel();
  }, []);

  useEffect(() => {
    if (auth && token) {
      isAlreadyBooked(token, hotelId).then((res) => {
        // console.log(res)
        if (res.data.ok) setAlreadyBooked(true);
      });
    }
  }, []);

  // submit


  // submit

  const loadSellerHotel = async () => {
    let res = await read(hotelId);
    setHotel(res.data);
  };
  const dataSlider = hotel.images;

  const handelClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(auth);
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
          // window.location.reload();
          alert.success("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert.success("Message was not sent!");
        }
      );
    if (!auth.isLogged) {
      navigate("/login");
    }
    // console.log(token, hotelId);
    let res = await getSessionId(token, hotelId);
    console.log(`${process.env.REACT_STRIPE_PUBLIC_KEY}`);
    const stripe = await loadStripe(
      `pk_test_51JfODqBKAAxF4P6LpTSlg3RhUJ2iKc8VuFPy3ATUScJ01xdqQvhYLAxE1fqKUhrlW1mWv5xRFfQ45pEoenNhI8SG00W7ig8Yot`
    );
    console.log(stripe);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log(result));
  };

  return (
    <div className="singleHotel">
      <div className="singleHotelHeader">
        <div className="sHotelHearder">
          <h1>{hotel.title}</h1>
          <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
        </div>

        <div className="row">
          <div className="col-md-3">
            <p className="location">
              <span className="fas fa-location-dot"></span> {hotel.location}
            </p>
          </div>
          <div className="col-md-3">
            <p className="location">
              from:{" "}
              <b>
                {moment(new Date(hotel.from)).format("MM Do YYYY, h:mm:ss a")}
              </b>
            </p>
          </div>
          <div className="col-md-3">
            <p className="location">
              to:{" "}
              <b>
                {moment(new Date(hotel.to)).format("MM Do YYYY, h:mm:ss a")}
              </b>
            </p>
          </div>
          <div className="col-md-3">
            <p className="location">
              Number of bed: <b>{hotel.bed}</b>
            </p>
          </div>
        </div>
      </div>
      <div className="div"></div>

      <div className="row mt-4">
        <div className="col-lg-9">
          {hotel.images && (
            <div className="container-slider">
              {dataSlider &&
                dataSlider.map((obj, index) => {
                  return (
                    <div
                      key={obj.public_id}
                      className={
                        slideIndex === index + 1 ? "slide active-anim" : "slide"
                      }
                    >
                      <img src={obj.url} alt="slide_mage" />
                    </div>
                  );
                })}
              <BtnSlider moveSlide={nextSlide} direction={"next"} />
              <BtnSlider moveSlide={prevSlide} direction={"prev"} />

              <div className="container-dots">
                {Array.from({
                  length: dataSlider.length,
                }).map((item, index) => (
                  <div
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                  ></div>
                ))}
              </div>
            </div>
          )}
          <div className="description mt-4">
            <b>
              <h1>{hotel.title}</h1>
            </b>
            <p className="pr-8">{hotel.content}</p>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="booking-side">
            <h1>
              perfect for {allDays(hotel.from, hotel.to)} {""}{" "}
              {allDays(hotel.from, hotel.to) < 1 ? "day" : "days"}
            </h1>
            <p>
              located in <span>{hotel.location}</span>
            </p>
            <div className="price">
              <b>${hotel.price}</b>{" "}
              <span>
                {" "}
                ({allDays(hotel.from, hotel.to)} {""}{" "}
                {allDays(hotel.from, hotel.to) < 1 ? "day" : "days"})
              </span>
            </div>
            <section>
              <div className="row" style={{ display: "nome" }}>
                <form ref={formRef} onClick={handelClick}>
                  <h3>Notify the owner</h3>
                  <div className="inputBox">
                    {/* <i class="fa-sharp fa-solid fa-satellite-dish"></i> */}
                    <span className="fa-sharp fa-solid fa-satellite-dish"></span>
                    <input
                      type="text"
                      placeholder="subject"
                      id="subject"
                      name="subject"
                      value={`${hotel.title} is now booked`}
                    ></input>
                  </div>
                  <div className="inputBox">
                    <span className="fas fa-envelope"></span>
                    <input
                      type="text"
                      placeholder="email"
                      id="email"
                      name="email"
                      value="galienwork01@gmail.com"
                    ></input>
                  </div>
                  <div className="inputBox">
                    <span className="fa-solid fa-message"></span>
                    <input
                      type="text"
                      placeholder="message"
                      id="msg"
                      name="message"
                      value={`${
                        hotel.title
                      } is now booked by the client \n ${hotel.postedBy &&
                        hotel.postedBy.name}\n
                      From: ${moment(new Date(hotel.from)).format(
                        "MM Do YYYY, h:mm:ss a"
                      )}\n
                To: ${moment(new Date(hotel.to)).format(
                  "MM Do YYYY, h:mm:ss a"
                )} \n at $${hotel.price}`}
                    ></input>
                  </div>
                  <button
                    className="btn"
                    onSubmit={handelClick}
                    onClick={handelClick}
                    disabled={loading || alreadyBooked}
                  >
                    {loading
                      ? "Loading..."
                      : alreadyBooked
                      ? "Already Booked"
                      : auth && token
                      ? "Book now"
                      : "Login to Book"}
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
