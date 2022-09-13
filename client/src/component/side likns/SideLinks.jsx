import React from "react";
import "./sidelinks.css";
import { Link } from "react-router-dom";

          // <a onClick={() => setDropIt(!dropIt)}>Login</a>;
          // <a onClick={() => setDropIt(!dropIt)}>Login</a>
          const SideLinks = ({ dropIt, setDropIt}) => {
            return (
              <div className={dropIt ? "side-links active" : "side-links"}>
                <nav>
                  <Link to="/login">
                    <a onClick={() => setDropIt(!dropIt)}>Login</a>
                  </Link>
                  <Link to="/register">
                    <a onClick={() => setDropIt(!dropIt)}>Register</a>
                  </Link>
                </nav>
              </div>
            );
          };

export default SideLinks;
