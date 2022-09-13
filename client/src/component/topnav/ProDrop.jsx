import React from 'react'
import './proDrop.css'
import { Link } from 'react-router-dom'
const ProDrop = ({ handleLogout, dropIt, setIsHandelProfDrop }) => {
  return (
    <div className={dropIt ? "side-links active" : "side-links"}>
      <nav>
        <Link to="/profile">
          <a onClick={() => setIsHandelProfDrop(!dropIt)}>Profile</a>
        </Link>
        <Link to="/" onClick={handleLogout}>
          <a onClick={() => setIsHandelProfDrop(!dropIt)}>Logout</a>
        </Link>
      </nav>
    </div>
  );
};

export default ProDrop