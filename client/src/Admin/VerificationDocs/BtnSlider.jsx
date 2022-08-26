import React from "react";
import "./Slider.css";
import { 
    FaArrowCircleRight,
    FaArrowCircleLeft
} from 'react-icons/fa';

export default function BtnSlider({ direction, moveSlide }) {
//   console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      {direction === "next" ? <FaArrowCircleRight style={{color:"black"}}/> : <FaArrowCircleLeft style={{color:"black"}}/>} 
    </button>
  );
}