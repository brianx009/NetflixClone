import "./list.scss";
import ListItem from "../listItem/ListItem";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useRef, useState } from "react";



{/*passing list as a prop so that way we could change our default titles
to the titles we set up on our database by calling list.title*/}

export default function List({list}) {
    //declaring these two in order to control our slider appearance if they are in a position to be moved
    const [isMoved, setisMoved] = useState(0)

    //declaring these two in order to control our slider from sliding out of bounds
    const [slideNumber, setSlideNumber] = useState(0)

    //allows us to select certain containers where the ref= listRef
    const listRef = useRef()
    
    //how we are to handle when the left/right arrows are clicked
    const handleClick = (direction) =>{
        setisMoved(true)
        //this will give us the exact location/ pizel size of our box, subtracts 50px because of the left margin that was set before.
        let distance = listRef.current.getBoundingClientRect().x - 50
        //when the left arrow is clicked and our slide number is greater than 0, direction is changed to left and we execute the code following
        if(direction === "left" && slideNumber>0){
            //sets our slide number to our slide number -1
            setSlideNumber(slideNumber - 1);
            //+230 to move everything "1 box" to the right and simulate as if were moving left
            listRef.current.style.transform = `translateX(${distance + 230}px)`
        }
        //when the right arrow is clicked and our slide number is less than 3, direction is changed to left and we execute the code following
        else if(direction === "right" && slideNumber < 3){
            //sets our slide number to our slide number +1
            setSlideNumber(slideNumber +1)
            //-230 to move everything "1 box" to the left and simulate as if were moving right
            listRef.current.style.transform = `translateX(${distance - 230}px)`
        }
    }
  return (
    <div className="list">
        {/*using list.title to pull all our information from mongodb and have a randomized set of list names */}
        <span className="listTitle">{list.title}</span>
        <div className="wrapper">
            <MdKeyboardArrowLeft className="sliderArrow left"
             onClick={()=>handleClick("left")}
              style = {{display: !isMoved && "none"}}
              />
            
            <div className="container" ref={listRef}>
                {/*again using list map, but now in order to call movies from our DB  */}
                {list.content.map((item, i)=>(
                    <ListItem index={i} item={item} />
                ))}

            </div>
            <MdKeyboardArrowRight className="sliderArrow right" 
            onClick={()=>handleClick("right")}
            />
        </div>
    </div>
  )
}
