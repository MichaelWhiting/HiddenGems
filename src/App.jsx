import React, { useEffect } from 'react'; // Make sure to import React and useEffect correctly
import axios from 'axios'; // Ensure axios is correctly imported, note the missing quote at the end in your snippet
import { useSelector, useDispatch } from 'react-redux'; // Redux hooks
import { NavLink, Outlet } from 'react-router-dom'; // React Router components
import { Navbar, Nav, Container } from 'react-bootstrap'; // React Bootstrap components
import * as Icon from 'react-bootstrap-icons'; // Importing React Bootstrap Icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS


import "./CSS/App.css"
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
      <Navbar expand='md' bg='info' data-bs-theme='dark'>
        <Container fluid className="d-flex">
          <Navbar.Brand>
            <Icon.Gem className="main-navbar-icon" />
            Hidden Gems
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                <Icon.HouseFill className="navbar-icon"/>
                Home
              </NavLink>
              <NavLink to="/topGems" className="nav-link">
                <Icon.ArrowUpSquare className="navbar-icon" />
                Top Gems
              </NavLink>
              <NavLink to="/discover" className="nav-link">
                <Icon.Search className="navbar-icon"/>
                Discover
              </NavLink>
              <NavLink to="/about" className="nav-link">
                  <Icon.InfoCircle className="navbar-icon"/>
                  About Us
              </NavLink>
            </Nav>
            <Nav className="ms-auto">
                <NavLink to="/login" className="nav-link" onClick={handleLogout}>
                  <Icon.BoxArrowInRight className="navbar-icon"/>
                  {userId ? "Logout" : "Login"}
                </NavLink>
                <NavLink to="/profile" className="nav-link">
                  <Icon.Person className="navbar-icon"/>
                  Profile
                </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}

export default App;
