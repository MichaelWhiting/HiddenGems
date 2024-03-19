import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

//pages
import TopGems from "./pages/TopGems.jsx";
import Home from "./pages/Home.jsx";
import Discover from "./pages/Discover.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";
import "./App.css"
import FullDetails from "./pages/FullDetails.jsx";
import Login from "./pages/Login.jsx";


//imports


function App() {
  const dispatch = useDispatch();
const userId = useSelector(state => state.userId)

const handleLogout = async () => {
  if(!userId){
    return
  }

  const res = await axios.get('/logout');


  if (res.data.success) {
    dispatch({
      type: 'LOGOUT'
    });

  }
};


  return (
    <BrowserRouter>
      <header className="app-header">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/topGems">Top Gems</NavLink>
        <NavLink to="/discover">Discover</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/login" onClick={handleLogout}>{userId ? "Logout":"Login"}</NavLink>
      </nav>
      </header>
      <main>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/topGems" element={<TopGems />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/fullDetails" element={<FullDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </main> 
    </BrowserRouter>
  );
}

export default App;
