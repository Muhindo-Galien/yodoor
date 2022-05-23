import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BookingCard from '../../component/card/BookingCard'
import ConnectNav from '../../component/connectNav/ConnectNav'
import DashboardNav from '../../component/dashboardnav/DashboardNav'
import { userHotelBookings } from '../../redux/actions/hotel'
import "./dashboard.css"

const Dashboard = () => {
  const token = useSelector(state => state.token);
  const [bookings,setBookings] = useState([])
 
  useEffect(()=>{
    loadUserBookings()
  },[])

  const loadUserBookings = async()=>{
    const res = await userHotelBookings(token);
    console.log(res);
    setBookings(res.data)
  }
  return (
    
    <div className="dashboard ">
      <div className='dashboard-text'>
        <h1>Buyer Dashboard</h1>
        <ConnectNav/>
      </div>
        <DashboardNav/>
        <div className='container-fluid'>
          <div className="row">

            <div className="col-md-10  ">
              <h2 >Your bookings</h2>
            </div>

            <div className="col-md-2 mt-3">
              <Link to="/rooms" className='btn-rect'>Browse Hotels</Link>
            </div>

          </div>
        </div>
        <div className="row">
          {bookings.map((b)=>(
            <BookingCard key={b._id} hotel={b.hotel} session={b.session} orderedBy={b.orderedBy}/>
          ))}
        </div>
    </div>
    
        
   
  )
}

export default Dashboard