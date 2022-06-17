//importing scss file in order to add styling properties to our home.jsx
import "./home.scss"
//importing Navbar so we could call it and have it display in our home page
import Navbar from "../../components/navbar/Navbar"
import Featured from "../../components/featured/Featured"
import List from "../../components/list/List"


//exports home page with navbar component
const Home = ({ type }) =>{
  return(
    <div className="home">
      {/*calls our navbar component to our home page */}
      <Navbar/>
      {/*calls our Featured component to our home page if we add "type="movie"" or "type="series" we could
       see the selector for movie/series genre, else it will be a blank home page*/}
      <Featured type = {type}/>
      <List/>
      <List/>
      <List/>
      <List/>
    </div>
  );
};

export default Home;

