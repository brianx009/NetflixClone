import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./watch.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function Watch() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();

  useEffect(()=> {
    const getMovie = async ()=>{
      try{
        const res = await axios.get("/movies/find/" + id,{
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTE2ZTU2NzYxZDA1ZDRjODViYzc2ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTkzOTY5OSwiZXhwIjoxNjU2MzcxNjk5fQ.w7QBBUPRxbfmJDvA2jL4IFu241MW9stVSopQFlaZIqo"
          },
        });
        setMovie(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getMovie()
  }, [id]);
  console.log(movie)

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <BiArrowBack />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
}