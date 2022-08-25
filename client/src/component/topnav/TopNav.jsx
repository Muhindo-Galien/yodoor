/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import logo from '../../assets/logoyo.jpg';
import homepic from '../../assets/home1.jpg';
import './topnav.css';
import { Link } from 'react-router-dom';
import SideLinks from '../side likns/SideLinks';
import {useSelector} from 'react-redux'
import axios from 'axios'
import { FaAngleDown } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';
import ProDrop from './ProDrop';


const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIt, setOpenIt] = useState(false);
  const [dropit, setDropit] = useState(false);
  const [isHandelProfDrop, setIsHandelProfDrop] = useState(false);
  
  const handelMenu =()=>{
    setIsOpen(!isOpen)
  }
  const handeOpenIt =()=>{
    setOpenIt(!openIt)
  }
  const handelDrop =()=>{
    setDropit(!dropit)
  }
  const handelProfDrop =()=>{
    setIsHandelProfDrop(!isHandelProfDrop)
  }
 
  // user
  const auth = useSelector(state => state.auth)
  const {user, isLogged} = auth

  const handleLogout = async () => {
    try {
        await axios.get('/api/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/";
    } catch (err) {
        window.location.href = "/";
    }
}

const userLink = () => {
    return <div className=" fas">

        <img src={user.avatar} alt="" className='prof'/><FaAngleDown onClick={()=>handelProfDrop()}/>
        {/* {user.name} <FaAngleDown/> */}
        <ProDrop dropit={isHandelProfDrop} handleLogout={handleLogout}/>
    </div>
}

const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0
}

  return (
    <div className='topnav'>

      <a href="/" className='logo'>
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
        <Link to='/admin'>
          <a onClick={() => setIsOpen(!isOpen)}>Admin</a>
        </Link>
        <Link to='/about'>
          <a onClick={() => setIsOpen(!isOpen)}>About us</a>
        </Link>
        <Link to='/contact'>
          <a onClick={() => setIsOpen(!isOpen)}>Contact us</a>
        </Link>
      </nav>

      <div className="icons">
        {/* <div className="fas fa-shopping-cart" onClick={()=>handeOpenIt()}></div> */}
        {isLogged&&<div className='fas'><Link to='/dashboard'><MdDashboardCustomize className='dash'/></Link></div>}
        {
                    isLogged
                    ? userLink()
                    : <div className="fas fa-user" onClick={()=>handelDrop()}></div>
                }
       
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
