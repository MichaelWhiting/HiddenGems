import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import '../CSS/Details.css'


function DetailsPage() {
  const [gems, setGems] = useState([]);
  const [ratings, setRatings] = useState([]);
  const location = useLocation();
  const { gemId } = location.state || {};
  const navigate = useNavigate();

  const gemCards = gems.map((gem, i) => {
    return (
      <div key={i} className='gem-card'>
        <h2 className="gem-location">{gem.name}</h2>
        <p className='gem-description'>{gem.description} </p>
        <p className='gem-description'>
        {gem.lat && <span>Latitude: {gem.lat}</span>}
        {gem.lng && <span>Longitude: {gem.lng}</span>}
        </p>
        {/* Display all comments */}
        {gem.comments && gem.comments.length > 0 ? (
          <div className="comments-section">
            <h6>Comments:</h6>
            {gem.comments.map((comment, index) => (
              <p key={index}>{comment.text}</p>
            ))}
          </div>
        ) : (
          <p>No comments yet</p>
        )}
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button>Comment</button>
        <div>Map API below</div>
      </div>
    )
  })

  const fetchData = async () => {
    const gemRes = await axios.get(`/getGem/${gemId}`)
    setGems([gemRes.data.gem])
  }

  useEffect(() => {
    fetchData()
  }, [gemId])
  return (
    <div className="top-gems-container">
      <div className="gems-grid">
          {gemCards}
      </div>
    </div>
  )
}

export default DetailsPage