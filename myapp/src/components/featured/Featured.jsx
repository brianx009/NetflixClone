import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";

import "./featured.scss";

export default function Featured({ type }) {
  return (
    <div className="featured">
      {/*if there is a type and category*/}
      {type && (
        <div className="category">
          {/*if our stype is a movie, title is Movies, else Series */}
          <span>{type === "movie" ? "Movies" : "Series"}</span>
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
          src="images/movieTitle/CC_GFN.png"
          alt=""
        />
        
        {/*Movie Description dummy text  */}
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          adipisci repellendus eum quasi illo, velit numquam, maxime tempora
          sint deleniti, aliquid qui? Facilis, adipisci! Ratione hic repudiandae
          temporibus eum earum?
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
