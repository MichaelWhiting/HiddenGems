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
import Login from "./pages/Login.jsx";
import DetailsPage from './pages/DetailsPage.jsx'
import Game2048 from './pages/game2048.jsx'
// import EditGem from './components/EditGem.jsx'
import Friends from './components/Friends.jsx'
import UpdateGem from './components/updateGem.jsx'

import 'bootstrap/dist/css/bootstrap.css'; // this is the import for bootstrap css

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Home />}/>
        <Route path="/topGems" element={<TopGems />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="2048" element={<Game2048 />} />
        <Route path="/updateGem/:gemId" element={<UpdateGem />} />
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
