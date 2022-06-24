import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./featured.scss";

export default function Featured({ type }) {
  return (
    <div className="featured">
      {/*if there is a type and category*/}
      {type && (
        <div className="category">
          {/*if our type is a movie, title is Movies, else Series */}
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          {/*options for selection */}
          <select name="genre" id="genre">
            {/*deault selected is going to be Genre */}
            <option>Genre</option>
            {/*other possible listed options included those below */}
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      {/* movie thumbnail */}
      <img
        src="images/movie/CC.png"
        alt=""
      />
      {/*Movie Title png */}
      <div className="info">
        <img
          src="https://see.fontimg.com/api/renderfont4/K7vrX/eyJyIjoiZnMiLCJoIjoxMzYsInciOjIwMDAsImZzIjo2OCwiZmdjIjoiIzk1MTgxOCIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/VGhlIEdvb2QgZm9yIG5vdGhpbmc/kung-fu-master.png"
          alt=""
        />
        
        {/*Movie Description dummy text  */}
        <span className="desc">
          Charlie Chaplins 25th Film Released Aug. 31 1914 As His New Profession An American comedy silent film made at the Keystone Studios and starring Charlie Chaplin. The film involves Chaplin taking care of a man in a wheelchair.
        </span>
        {/*Play Button Icon */}
        <div className="buttons">
          <button className="play">
            <BsFillPlayFill/>
            <span>Play</span>
          </button>
          {/*Information button Icon */}
          <button className="more">
            <AiOutlineInfoCircle/>
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
