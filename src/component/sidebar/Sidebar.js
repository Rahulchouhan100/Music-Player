import React from "react";
import "./sidebar.css";
import logo from "../../assest/logo.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <img src={logo} alt="spotify-logo" className="logo" />
        <ul>
          <li>
            <a href="">For You</a>
          </li>
          <li>
            <a href="">Top Tracks</a>
          </li>
          <li>
            <a href="">Favourites</a>
          </li>
          <li>
            <a href="">Recently played</a>
          </li>
        </ul>
      </div>
      <div>
        <img
          src="https://randomuser.me/api/portraits/men/40.jpg"
          alt="profile-photo"
          className="profile-photo"
        />
      </div>
    </div>
  );
};

export default Sidebar;
