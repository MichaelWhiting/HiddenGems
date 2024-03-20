import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function TopGems() {
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
    const gemRes = await axios.get("/getAllGems")
    setGems(gemRes.data.gem)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
      <h1>Top Gems</h1>
      <div>
       {gemCards} 
      </div>
    </div>
  );
}

export default TopGems;
