import React, { useState } from 'react'
import "./samllcard/samllcard.css";
import { currencyFormatter } from '../../redux/actions/stripe'
import { allDays } from '../../redux/actions/hotel'


import moment from 'moment'
import OrderModal from '../Modals/OrderModal'


const BookingCard = ({orderedBy,hotel,session}) => {
    const [showModal,setShowModal]= useState(false)

  return (
    <div className='samllCard'>
           <div className="row" key={hotel._id}>
                <div className="content">
                    <h3>{hotel.title}</h3>
                    <p className='location'>
                        <span className='fas fa-location-dot'></span> {hotel.location}
                    </p>
                    <p>{`${hotel.content.substring(1,60)}...`}</p>
                    <p className='location'>            
                       Number of bed:  <b>{hotel.bed}</b>
                    </p>
                    <p className='location'>

                        Available for :<b> {allDays(hotel.from, hotel.to)}  {allDays(hotel.from, hotel.to) <= 1 ? ' day':' days'}
                    </b>
                    </p>
                    
                    <p className='location'>
                    Available from : <b>{new Date(hotel.from).toLocaleDateString()}</b>
                    </p>                  

                    <div className="price"><b>
                    {
                    currencyFormatter({
                        amount:hotel.price*100,
                        currency:"usd",
                    })}</b> <span>added: {moment(hotel.createdAt).fromNow()}</span></div>

                    {showModal && <OrderModal session={session} orderedBy={orderedBy} showModal={showModal} setShowModal={setShowModal} />}

                    <div className="r-buttons">

                     <a className="btn r-more" onClick={()=>setShowModal(!showModal)} style={{color:'#548CFF'}} >Show Payment Info</a>
                    {/* <a className="btn">Book Now</a> */}
                    </div>
    
                </div>
                <div className="image">
                    {
                        hotel.images[0]&&<img src={hotel.images[0].url} alt="first image"/>
                    }
                </div>
            </div>
    </div>
  )
}

export default BookingCard