import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { allDays, isAlreadyBooked, read } from "../../redux/actions/hotel";
import { useSelector } from "react-redux";
import "./signleHotel.css";
import BtnSlider from "./BtnSlider";
import moment from "moment";
import { getSessionId } from "../../redux/actions/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { allBlogs } from "../../redux/actions/blog";

const SingleBlog = () => {
  const [blogs, setBolgs] = useState([]);
  // const [loading,setLoading] = useState(false)
 
  const [slideIndex, setSlideIndex] = useState(1);

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

  const loadSellerHotel = async () => {
    let res = await allBlogs();
    setBolgs(res.data);
  };
  let dataSlider;;
  
  let data = blogs.map((item)=>{
     dataSlider=item.images
  });

  return (
    <div className="singleHotel">
      <div className="div"></div>
      <div className="row mt-4">
        <div className="col-lg-9">
          {blogs.map((blog,index)=>{
            const { title, content, location, images } = blog;
            return (
              <div key={index}>
                {images && (
                  <div className="container-slider">
                    {dataSlider &&
                      dataSlider.map((obj, index) => {
                        return (
                          <div
                            key={obj.public_id}
                            className={
                              slideIndex === index + 1
                                ? "slide active-anim"
                                : "slide"
                            }
                          >
                            <img src={obj.url} alt="slide_mage" />
                          </div>
                        );
                      })}
                    <BtnSlider moveSlide={nextSlide} direction={"next"} />
                    <BtnSlider moveSlide={prevSlide} direction={"prev"} />

                    <div className="container-dots">
                      {Array.from({ length: dataSlider.length }).map(
                        (item, index) => (
                          <div
                            onClick={() => moveDot(index + 1)}
                            className={
                              slideIndex === index + 1 ? "dot active" : "dot"
                            }
                          ></div>
                        )
                      )}
                    </div>
                  </div>
                )}
                <div className="description mt-4">
                  <b>
                    <h1>{blog.title}</h1>
                  </b>
                  <p className="pr-8">{blog.content}</p>
                </div>
              </div>
            );
          })}
          
          
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
