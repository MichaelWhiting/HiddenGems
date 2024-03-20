import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../CSS/Gems.css";

function TopGems() {
  const [gems, setGems] = useState([]);
  const navigate = useNavigate();

  const gemCards = gems.sort((a, b) => b.enjoyAvg - a.enjoyAvg).map((gem, i) => {
    return (
      <div key={i} className="gem-card">
        <h2 className="gem-location">{gem.name}</h2>
        <p className="gem-description">{gem.description}</p>
        <h3>Popularity: { gem.popularAvg ? gem.popularAvg : "null"}</h3>
        <h3>Enjoyablity: {gem.enjoyAvg ? gem.enjoyAvg : "null"}</h3>
        <button className="hyper-link" onClick={() => navigate("/details")}>Full Details</button>
      </div>
    )
  })

  const fetchData = async () => {
    const gemRes = await axios.get("/getAllGems");
    console.log("Setting gems to: ", gemRes.data.gems)
    setGems(gemRes.data.gems);
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
