import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import '../CSS/Details.css'

function DetailsPage() {
  const [gems, setGems] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [showRatings, setShowRatings] = useState (true)

  const gemCards = gems
  .filter(gem => gem.gemId === 1)
  .map((gem, i) => {
  return (
    <div key={i} className='gem-card'>
      <h2 className="gem-location">{gem.name}</h2>
      <p className='gem-description'>{gem.description} </p>
      <p className='gem-description'>
      {gem.lat && <span>Latitude: {gem.lat}</span>}
      {gem.lng && <span>Longitude: {gem.lng}</span>}
      </p>
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <button>Comment</button>
      <div>Map API below</div>
     
    </div>
  )
  })

  const fetchData = async () => {
    const gemRes = await axios.get("/getAllGems")
    setGems(gemRes.data.gem)
  }
//   const displayPosts = () => {
//     setShowGems(true)
//     setShowRatings(true)
//   }
  useEffect(() => {
    fetchData()
  }, [])
  const navigate = useNavigate();
  return (
    <div className="top-gems-container">
    <div className="gems-grid">
        {gemCards}
        
    </div>
    </div>
  )
}

export default DetailsPage