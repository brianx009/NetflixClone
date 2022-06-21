import "./listItem.scss";
import { BsFillPlayFill } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { BiLike, BiDislike } from "react-icons/bi";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item,{
            headers:{
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTE2ZTU2NzYxZDA1ZDRjODViYzc2ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTQyNjcyNCwiZXhwIjoxNjU1ODU4NzI0fQ.GHkwoLsRJfedxv5TbQjt_ma3nkmxGpHrH0_gcne7wPo"
            },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  
  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src ={movie.image}
        alt=""
      />
      {isHovered && (
        <>
          {/*calling trailer from database using movie.trailer */}
          <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            {/*icons for play, like, dislike, and add movie */}
            <div className="icons">
              <BsFillPlayFill className="icon" />
              <IoIosAdd className="icon" />
              <BiLike className="icon" />
              <BiDislike className="icon" />
            </div>
            <div className="itemInfoTop">
              {/*time limit of movie being called from the database using movie.duration */}
              <span>{movie.duration}</span>
              {/*Age limit recstrictions beig called from DB using item.limit */}
              <span className="limit">+{movie.limit}</span>
              {/*year released being called from the DB using movie.year */}
              <span>{movie.year}</span>
            </div>
            {/*description of the movie being called from the DB using movie.desc*/}
            <div className="desc">
             {movie.desc}
            </div>
            {/* Movie Genre being called from the DB using movie.genre */}
            <div className="genre">
              {movie.genre}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
