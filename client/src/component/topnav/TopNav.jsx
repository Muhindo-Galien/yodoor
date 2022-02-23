import React, { useState } from 'react';
import logo from '../../assets/logoyo.png';
import homepic from '../../assets/home1.jpg';
import './topnav.css';
import { Link } from 'react-router-dom';
import SideLinks from '../side likns/SideLinks';

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIt, setOpenIt] = useState(false);
  const [dropit, setDropit] = useState(false);
  const handelMenu =()=>{
    setIsOpen(!isOpen)
  }
  const handeOpenIt =()=>{
    setOpenIt(!openIt)
  }
  const handelDrop =()=>{
    setDropit(!dropit)
  }
  return (
    <div className='topnav'>

      <a href="#" className='logo'>
        <img src={logo} alt="logo" />
      </a>

      <nav className={isOpen?'navbar active':'navbar'}>
        <Link to='/'>
          <a  onClick={() => setIsOpen(!isOpen)}>Home</a>
        </Link>
        <Link to='/rooms'>
          <a onClick={() => setIsOpen(!isOpen)}>Rooms</a>
        </Link>
        <Link to='/blog'>
          <a onClick={() => setIsOpen(!isOpen)}>Blog</a>
        </Link>
        <Link to='/about'>
          <a onClick={() => setIsOpen(!isOpen)}>About us</a>
        </Link>
        <Link to='/contact'>
          <a onClick={() => setIsOpen(!isOpen)}>Contact us</a>
        </Link>
      </nav>

      <div className="icons">
        <div className="fas fa-shopping-cart" onClick={()=>handeOpenIt()}></div>
        <div className="fas fa-user" onClick={()=>handelDrop()}></div>
        <div className="fas fa-bars" id='menu-btn' onClick={()=>handelMenu()}></div>
      </div>
      <SideLinks dropit={dropit}/>

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
