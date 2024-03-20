
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import '../CSS/Discover.css'



function Discover() {
  const [gems, setGems] = useState([]);
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();

  const gemCards = gems.map((gem, i) => {
    return (
      <div key={i} className='gem-card'>
     <h2 className="gem-location">{gem.name}</h2>
      <p className='gem-description'>{gem.description} </p>
      <h3>RATING GOES HERE</h3>
        <button className="hyper-link" onClick={() => navigate("/details")}>Full Details</button>
      </div>
    )
  });

  const fetchData = async () => {
    const gemRes = await axios.get("/getAllGems");
    setGems(gemRes.data.gem)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
    <div className='discover'>
      <h1>GEMS YOU MIGHT LIKE</h1>
      <div className="discover-container">
      <div className='gems-grid'>
        {gemCards}
      </div>
      </div>
    </div>
    </>
  )
}

export default Discover


