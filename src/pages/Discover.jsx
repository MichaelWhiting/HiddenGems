
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"



function Discover() {
  const [gems, setGems] = useState([]);
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();

  const gemCards = gems.map((gem, i) => {
    return (
      <div key={i}>
        {gem.locationName} {gem.description}
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
      <div className='GemContainer'>
        {gemCards}
      </div>
    </div>
    </>
  )
}

export default Discover


