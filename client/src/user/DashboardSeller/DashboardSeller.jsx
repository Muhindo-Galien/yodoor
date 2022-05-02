import React from 'react'
import { Link } from 'react-router-dom'
import ConnectNav from '../../component/connectNav/ConnectNav'
import DashboardNav from '../../component/dashboardnav/DashboardNav'
import "./dashboard_seller.css"

const DashboardSeller = () => {
  return (
    
    <div className="dashboardseller ">
        <div className='dashboard-text'>
            <h1> Seller Dashboard</h1>
              <ConnectNav/>
        </div>
        <DashboardNav/>

        <div className='container-fluid'>
          <div className="row">

            <div className="col-md-10  ">
              <h2 >Your Hotels</h2>
            </div>

            <div className="col-md-2">
              <Link to="/hotels/new" className='btn'>+ Add New</Link>
            </div>

          </div>
            <p>Show all bookings and button to browser hotels</p>
        </div>
    </div>
        
   
  )
}

export default DashboardSeller