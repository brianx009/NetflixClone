//importing scss to make "navbar" appear white
import "./navbar.scss"
import {SearchRoundedIcon, NotificationsRoundedIcon } from '@mui/icons-material';





//Navbar
//image of our logo is pulled from the public/Images/Logo.png 
//folder and because it is in that public folder there is no need for us to
//import a folder that would pull the image for us and we could use it freely.
const Navbar = () => {
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
              <SearchRoundedIcon />
              <span>KID</span>
              <NotificationsRoundedIcon/>
            </div>
        </div>
    </div>
  );
};

export default Navbar