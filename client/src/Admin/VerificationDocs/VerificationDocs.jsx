import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./signleHotel.css";
import BtnSlider from "./BtnSlider";
import { adminHotelDocs } from "../../redux/actions/admin";
import Sidebar from "../Sidebar";

const VerificationDocs = () => {
  const [docs, setDocs] = useState([]);
  // const [loading,setLoading] = useState(false)
  const token = useSelector((state) => state.token);
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
    loadVerificationDocs();
  }, []);

  const loadVerificationDocs = async () => {
    let res = await adminHotelDocs(token);
    setDocs(res.data);
  };
  console.log("docs");
  console.log(docs);
  let dataSlider;

  let data = docs.map((item) => {
    dataSlider = item.images;
  });

  return (
    <div className="singleHotel">
      <div className="div"></div>
      <div className="row mt-4">
        <div className="col-lg-4"><Sidebar/></div>
        <div className="col-lg-8">
          {docs.map((doc, index) => {
            const { name, images } = doc;
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
                  <h1>
                    Room Manager:
                    <b>{doc.roomManager.name}</b>
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VerificationDocs;
