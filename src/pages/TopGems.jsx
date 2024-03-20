// TopGems.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../CSS/Gems.css";
import RatingBar from '../components/RatingBar'; // Import RatingBar component

function TopGems() {
  const [gems, setGems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const gemRes = await axios.get("/getAllGems");
      setGems(gemRes.data.gems); // Adjust according to your API response structure
    };

    fetchData();
  }, []);

  const gemCards = gems.sort((a, b) => b.enjoyAvg - a.enjoyAvg).map((gem, i) => (
    <div key={i} className="gem-card">
      <h2 className="gem-location">{gem.name}</h2>
      <p className="gem-description">{gem.description}</p>
     
      <div>
        Enjoyability:
        <RatingBar rating={gem.enjoyAvg ? gem.enjoyAvg : 0} />
        Popularity:
        <RatingBar rating={gem.popularAvg ? gem.popularAvg : 0} />
      </div>
      <button className="hyper-link" onClick={() => navigate(`/details/${gem.id}`)}>Full Details</button> {/* Adjust the navigation path as needed */}
    </div>
  ));

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
