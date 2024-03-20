import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './CSS/index.css'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

// Pages & Components
import TopGems from "./pages/TopGems.jsx";
import Home from "./pages/Home.jsx";
import Discover from "./pages/Discover.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";
import FullDetails from "./pages/FullDetails.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Home />}/>
        <Route path="/topGems" element={<TopGems />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/fullDetails" element={<FullDetails />} />
        <Route path="/login" element={<Login />} />
      </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
