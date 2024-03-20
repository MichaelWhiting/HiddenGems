import { BrowserRouter, Routes, Route, NavLink, Link, Outlet } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useEffect } from "react";
import Login from "./pages/Login";



function App() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);

  const sessionCheck = async () => {
    const res = await axios.get("/session-check");

    if (res.data.success) {
      console.log("This is running anytime it checks if someone is logged in");
      // setUserId(res.data.userId)
      dispatch({
        type: "USER_AUTH",
        payload: res.data.userId

      })
    }
  }

  //2. invoke that function on intitial reder only (with a useEffect() hook)
  // useffect takes in a (callback, optionalDependencyArray)
  // if the dependencyArray is not provided, useEffect will run on EvERy render
  // if dependencyArray is empty ([]), then this tells useEffect to only 
  // run on the initial render
  // if the dependencyArray contains values, useEffect will only run
  // each time one of those vaues is changes/used
  useEffect(() => {
    sessionCheck()
  }, [])


  const handleLogout = async () => {
    if (!userId) { return }

    const res = await axios.get('/logout');

    if (res.data.success) {
      dispatch({
        type: 'LOGOUT'
      });

    }
  };


  return (
    <>
      <Navbar expand='md' bg='success' data-bs-theme='dark'>
        <Container fluid className="d-flex"> 
            <Nav>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/topGems">Top Gems</NavLink>
              <NavLink to="/discover">Discover</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/login" onClick={handleLogout}>{userId ? "Logout" : "Login"}</NavLink>
            </Nav>
          </Container>
      </Navbar>
      { userId && 
        <Outlet/>
      }
      { !userId && 
        <Login/>
      }
    </>
  );
}

export default App;
