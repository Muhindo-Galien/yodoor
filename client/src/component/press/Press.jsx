import React from 'react'
import word from "../../assets/word.png";
import tnw from "../../assets/tnw.png";
import "./press.css"

const Press = () => {
  return (
    <section className='press'>
      <img src={word} alt="" />
      <img src={tnw} alt="" />
      <img src={word} alt="" />
      <img src={tnw} alt="" />
    </section>
  );
}

export default Press