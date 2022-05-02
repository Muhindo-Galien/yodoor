import React from 'react'
import { Link } from 'react-router-dom'
import ConnectNav from '../../component/connectNav/ConnectNav'
import DashboardNav from '../../component/dashboardnav/DashboardNav'
import "./dashboard.css"

const Dashboard = () => {
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

            <div className="col-md-2">
              <Link to="/rooms" className='btn'>Browse Hotels</Link>
            </div>

          </div>
            <p>Show all bookings and button to browser hotels</p>
        </div>
    </div>
        
   
  )
}

export default Dashboard