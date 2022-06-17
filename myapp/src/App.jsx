import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const user = true;
  return (
    /*setting routes for Home, Register, Login, Movies, Series, and Watch pages in react router dom version 6*/
    <Router>
      <Routes>
        {/*if user is true, allow access to home, else send them to register */}
        <Route exact path='/' element={user ? <Home/> : <Register/>} />
        {/*if user is false, send them to register, else send them to home */}
        <Route path='/register' element={!user ? <Register/> : <Home/>} />
        {/*if user is false, send them to login, else send them to home */}
        <Route path='/login' element={!user ? <Login/> : <Home/>} />
        { user && (
          <>
        <Route path='/movies' element={<Home type='movies' />}/>
        <Route path='/series' element={<Home type='series' />}/>
        <Route path='/watch' element={<Watch/>} />
        </>
        )}

  
      </Routes>
    </Router>
  );
};

export default App;