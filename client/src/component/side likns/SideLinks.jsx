import React from "react";
import "./sidelinks.css";
import { Link } from "react-router-dom";

const SideLinks = ({ dropit }) => {
  return (
    <div className={dropit ? "side-links active" : "side-links"}>
      <nav>
        <Link to="/login">
          <a>Login</a>
        </Link>
        <Link to="/register">
          <a>Register</a>
        </Link>
      </nav>
    </div>
  );
};

export default SideLinks;
