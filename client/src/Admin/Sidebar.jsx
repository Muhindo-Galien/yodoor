import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin">
        <p>AllHotels</p>
      </Link>
      <Link to="/admin/blogs">
        <p>Blogs</p>
      </Link>
      <Link to="/admin/users">
        <p>Users</p>
      </Link>
      <Link to="/admin/documents">
        <p>Document</p>
      </Link>
    </div>
  );
};

export default Sidebar;
