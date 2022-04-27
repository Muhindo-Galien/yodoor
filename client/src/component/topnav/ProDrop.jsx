import React from 'react'
import './proDrop.css'
import { Link } from 'react-router-dom'
const ProDrop = ({handleLogout,dropit}) => {
  return (
    <div className={dropit?"side-links active":"side-links"}>
        <nav> 
            <Link to='/profile'>
                <a>Profile</a>
            </Link>  
            <Link to="/" onClick={handleLogout}>
                <a>Logout</a>
            </Link>
            {/* <ul className="drop-nav dropdown">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
        </ul> */}
          
        </nav>
    </div>
  )
}

export default ProDrop