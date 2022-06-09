//importing scss file in order to add styling properties to our home.jsx
import "./home.scss"
//importing Navbar so we could call it and have it display in our home page
import Navbar from "../components/navbar/Navbar"
import Featured from "../components/featured/Featured"

//exports home page with navbar component
export default function Home() {
  return (
    <div className="home">
      {/*calls our navbar component to our home page */}
      <Navbar/>
      <Featured/>
    </div>
  )
}
