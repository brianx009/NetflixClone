//  importing search and bell icons from react icons
import { FaSearch, FaBell } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from "react";
//importing scss to make "navbar" appear white
import "./navbar.scss";
import {Link} from "react-router-dom";




//Navbar
//images are pulled from the public/Images/
//folder and because it is in that public folder there is no need for us to
//import a folder that would pull the image for us and we could use it freely.
const Navbar = () => {
  //sets initial state when page hasnt been scrolled down = 0
  const [isScrolled, setIsScrolled] = useState(false);

  //when we catch our y axis changing on the page and it is no longer 0
  window.onscroll = () => {
    //if scroll = 0, state is false, else true
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        {/*Here we are dealing with the contents that are going to be displayed on our left side of our navbar*/}
        <div className="left">
          {/*image is the container for our website logo */}
          <img
            src="images/image0.png"
            alt=""
          />
          {/*This is where we are creating text on our website that will be interatable on the navbar*/ }
          <Link to="/" className="link" >
          <span>Homepage</span>
          </Link>
          <Link to="/series" className="link" >
          <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
          <span>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        {/*on the right side of our navbar we are adding a search and a notification bell icon as well as a indicator as to who is watching,
        in this case it is "KID" */}
        <div className="right">
          <FaSearch className= "icon"/>
          <span>KID</span>
          <FaBell className= "icon"/>
          {/*image being displayed will be the user whose signed in */}
          <img
            src="images/Young_Picture.png"
            alt=""
          />
          <div className="profile">
            <IoIosArrowDropdown className = "icon"/>
            {/*div class "options" will hold the options for when we use the drop down menu (settings, Logout) */}
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
