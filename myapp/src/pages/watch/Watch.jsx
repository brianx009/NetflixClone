import { BiArrowBack } from "react-icons/bi";
import "./watch.scss";

export default function Watch() {
  return (
    <div className="watch">
      <div className="back">
        <BiArrowBack />
        Home
      </div>
      <video
        className="video"
        autoPlay
        progress
        controls
        src="https://ia802702.us.archive.org/14/items/CC_1914_08_31_TheGoodforNothing/CC_1914_08_31_TheGoodforNothing_512kb.mp4"
      />
    </div>
  );
}