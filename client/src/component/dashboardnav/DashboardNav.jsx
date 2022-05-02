import React from 'react'
import { Link } from 'react-router-dom';
import "./dashboardnav.css"
const DashboardNav = () => {
  const active = window.location.pathname;
  return (
    <ul className='nav nav-tabs mb-2'>
        <li className="nav-item">
            <Link to='/dashboard' className={`nav-link dashlink ${active === "/dashboard" && "active activated"}`}>Your bookings</Link>
        </li>
        <li className="nav-item">
            <Link to='/dashboard/seller' className={`nav-link dashlink ${active === "/dashboard/seller" && "active activated"}`}>Your Hotels</Link>
        </li>
    </ul>
  )
}

export default DashboardNav