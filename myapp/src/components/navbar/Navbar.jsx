/*
//importing scss to make "navbar" appear white
import "./navbar.scss"



//Navbar
//image of our logo is pulled from the public/Images/Logo.png 
//folder and because it is in that public folder there is no need for us to
//import a folder that would pull the image for us and we could use it freely.

const Navbar = ()=>{
  return (
    <div className = "navbar">
        <div className = "container"> 
            <div className = "left">
                <img src = "images/Logo.png" alt = ""/>
            
                <span>Homepage</span>
                <span>Series</span>
                <span>Movies</span>
                <span>New and Popular</span>
                <span>My List</span>
              </div>
              <div className = "right">

            </div>
        </div>
    </div>
  );
};

export default Navbar;

*/
import { FaSearch, FaBell } from "react-icons/fa";
import { useState } from "react";
import "./navbar.scss";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="images/Logo.png"
            alt=""
          />
          <span>Homepage</span>
          <span>Series</span>
          <span>Movies</span>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <FaSearch className= "icon"/>
          <span>KID</span>
          <FaBell className= "icon"/>
          <img
            src="images/Logo.png"
            alt=""
          />
          <div className="profile">
            
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
