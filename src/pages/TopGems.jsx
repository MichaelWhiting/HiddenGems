import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../CSS/Gems.css";

function TopGems() {
  const [gems, setGems] = useState([]);
  const navigate = useNavigate();

  const gemCards = gems.map((gem, i) => {
    if (!gem.ratings.length) {
      return (
        <div key={i} className="gem-card">
          <h2 className="gem-location">{gem.name}</h2>
          <p className="gem-description">{gem.description}</p>
          <h3>No Popularity</h3>
          <h3>No Enjoyability</h3>
          <button className="hyper-link" onClick={() => navigate("/details")}>Full Details</button>
        </div>
      )
    } else {
      // const popAvg = Math.round(gem.ratings.map((rating) => rating.popularity).reduce((a, c) => a + c, 0) / gem.ratings.length)
      // const enjoyAvg = Math.round(gem.ratings.map((rating) => rating.enjoyability).reduce((a, c) => a + c, 0) / gem.ratings.length)
  
      return (
        <div key={i} className="gem-card">
          <h2 className="gem-location">{gem.name}</h2>
          <p className="gem-description">{gem.description}</p>
          <h3>Popularity: {popAvg}</h3>
          <h3>Enjoyablity: {enjoyAvg}</h3>
          <button className="hyper-link" onClick={() => navigate("/details")}>Full Details</button>
        </div>
      )
    }
  });

  const fetchData = async () => {
    const gemRes = await axios.get("/getAllGems");
    setGems(gemRes.data);
  }


  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="top-gems-container">
      <h1 className="top-gems-title">Top Gems</h1>
      <div className="gems-grid">
       {gemCards}
      </div>
    </div>
  );
}

export default TopGems;
