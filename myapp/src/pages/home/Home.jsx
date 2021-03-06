//importing scss file in order to add styling properties to our home.jsx
import "./home.scss";
//importing Navbar so we could call it and have it display in our home page
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";


//exports home page with navbar component
const Home = ({ type }) =>{
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(()=> {
    const getRandomLists = async ()=>{
      try{
        const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,{
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTE2ZTU2NzYxZDA1ZDRjODViYzc2ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTkzOTY5OSwiZXhwIjoxNjU2MzcxNjk5fQ.w7QBBUPRxbfmJDvA2jL4IFu241MW9stVSopQFlaZIqo",
          },
        });
        setLists(res.data);
      } catch(err) {
        console.log(err)
      }
    };
    getRandomLists();
  }, [type, genre]);
  return(
    <div className="home">
      {/*calls our navbar component to our home page */}
      <Navbar/>
      {/*calls our Featured component to our home page if we add "type="movie"" or "type="series" we could
       see the selector for movie/series genre, else it will be a blank home page*/}
      <Featured type = {type}/>
      {lists.map((list) =>(
        <List list={list}/>

      ))}
    </div>
  );
};

export default Home;

