import "./listItem.scss";
import { BsFillPlayFill } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { BiLike, BiDislike } from "react-icons/bi";

import { useState } from "react";

export default function ListItem({ index }) {
  const [isHovered, setIsHovered] = useState(false);
  const trailer =
    "https://ia802702.us.archive.org/14/items/CC_1914_08_31_TheGoodforNothing/CC_1914_08_31_TheGoodforNothing_512kb.mp4";
  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src ="images/movie/CC.png"
        alt=""
      />
      {isHovered && (
        <>
          <video src={trailer} autoPlay={true} loop />
          <div className="itemInfo">
            {/*icons for play, like, dislike, and add movie */}
            <div className="icons">
              <BsFillPlayFill className="icon" />
              <IoIosAdd className="icon" />
              <BiLike className="icon" />
              <BiDislike className="icon" />
            </div>
            <div className="itemInfoTop">
              {/*time limit of movie */}
              <span>13 Minuets 30 Seconds</span>
              {/*Age limit recstrictions */}
              <span className="limit">G</span>
              {/*year released */}
              <span>Aug. 31 1914</span>
            </div>
            {/*description of the movie */}
            <div className="desc">
              Charlie Chaplins 25th Film As His New Profession 
              An American comedy silent film made at the Keystone 
              Studios and starring Charlie Chaplin.
            </div>
            {/* Movie Genre */}
            <div className="genre">
              Comedy
            </div>
          </div>
        </>
      )}
    </div>
  );
}
