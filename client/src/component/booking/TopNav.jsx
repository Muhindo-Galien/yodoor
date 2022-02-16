import React, { useState } from 'react';
import logo from '../../assets/logoyo.png';
import homepic from '../../assets/home1.jpg';
import './topnav.css';

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIt, setOpenIt] = useState(false);
  const handelMenu =()=>{
    setIsOpen(!isOpen)
  }
  const handeOpenIt =()=>{
    setOpenIt(!openIt)
  }
  return (
    <div className='topnav'>

      <a href="#" className='logo'>
        <img src={logo} alt="logo" />
      </a>

      <nav className={isOpen?'navbar active':'navbar'}>
        <a href="#">Home</a>
        <a href="#">Rooms</a>
        <a href="#">Blog</a>
        <a href="#">About us</a>
        <a href="#">Contact us</a>
      </nav>

      <div className="icons">
        <div className="fas fa-shopping-cart" onClick={()=>handeOpenIt()}></div>
        <div className="fas fa-user"></div>
        <div className="fas fa-bars" id='menu-btn' onClick={()=>handelMenu()}></div>
      </div>

      <div className={openIt?"carts-item-container active":"carts-item-container"}>
        <div className="cart-item">
          <span className='fas fa-times'></span>
          <img src={homepic} alt="title" />
          <div className="content">
            <h3>cart item (1)</h3>
            <div className='price'>$15.99/-</div>
          </div>
        </div>
        <div className="cart-item">
          <span className='fas fa-times'></span>
          <img src={homepic} alt="title" />
          <div className="content">
            <h3>cart item (1)</h3>
            <div className='price'>$15.99/-</div>
          </div>
        </div>
        <div className="cart-item">
          <span className='fas fa-times'></span>
          <img src={homepic} alt="title" />
          <div className="content">
            <h3>cart item (1)</h3>
            <div className='price'>$15.99/-</div>
          </div>
        </div>
        <div className="cart-item">
          <span className='fas fa-times'></span>
          <img src={homepic} alt="title" />
          <div className="content">
            <h3>cart item (1)</h3>
            <div className='price'>$15.99/-</div>
          </div>
        </div>
        <a href="#" className='btn'>Check out now</a>

      </div>

    </div>
  );
};

export default TopNav;
