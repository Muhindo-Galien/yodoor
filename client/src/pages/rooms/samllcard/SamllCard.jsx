import React from 'react'
import "./samllcard.css"
import { currencyFormatter } from '../../../redux/actions/stripe'
import { allDays } from '../../../redux/actions/hotel'
import {Link, useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const SamllCard = ({h,owner=false,viewMoreButton=true,handelHotelDelete = (f)=>f}) => {
  const navigate = useNavigate();
  return (
    <div className='samllCard'>
           <div className="row" key={h._id}>
                <div className="content">
                    <h3>{h.title}</h3>
                    <p className='location'>
                        <span className='fas fa-location-dot'></span> {h.location}
                    </p>
                    <p>{`${h.content.substring(1,150)}...`}</p>
                    <p className='location'>            
                       Number of bed:  <b>{h.bed}</b>
                    </p>
                    <p className='location'>

                        Available for :<b> {allDays(h.from, h.to)}  {allDays(h.from, h.to) <= 1 ? ' day':' days'}
                    </b>
                    </p>
                    
                    <p className='location'>
                    Available from : <b>{new Date(h.from).toLocaleDateString()}</b>
                    </p>                  

                    <div className="price"><b>
                    {
                    currencyFormatter({
                        amount:h.price,
                        currency:"usd",
                    })}</b> <span>added on: 21st, Dec,2022</span></div>

                    <div className="r-buttons">

                        {viewMoreButton && <a className="btn r-more" onClick={()=>navigate(`/hotel/${h._id}`)} style={{color:'#548CFF'}}>More Info</a>}
                        {viewMoreButton && <a className="btn">Book Now</a>}
                    </div>
                    {owner && (
                    <div className="d-flex justify-content-between h1">
                        <Link to={`/hotel/edit/${h._id}`}>
                            <FaEdit className='text-warning'/>
                        </Link>
                        <MdDelete onClick={()=>handelHotelDelete(h._id)}className="text-danger"/>
                    </div>)}
                </div>
                <div className="image">
                    <img src={h.image} alt={h.image} />
                </div>
            </div>
    </div>
  )
}

export default SamllCard