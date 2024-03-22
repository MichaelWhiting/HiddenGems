import React, { useState }  from 'react';
import '../CSS/RatingBar.css';
import GemIcon from './GemIcon.jsx'
import axios from 'axios'


  
  
  const RatingBar = ({ rating, gemId, reload, setReload }) => {
   const saveRating = async (i) => {
    setReload(!reload)
   const enjoyability = i * 20
   const popularity = i * 20

    const res = await axios.post("/createRating", {enjoyability, popularity, gemId}) 
    console.log(res.data)
   }
    
    const filledGems = rating / 20; 
  
    return (
      <div className="rating-container">
        {Array.from({ length: 5 }).map((_, i) => {
          const fillLevel = Math.max(0, Math.min(100, (filledGems - i) * 100));

          return <GemIcon key={i} rating={fillLevel} onClick={() => saveRating(i + 1)} />;
        })}
        <label>{rating}</label>
      </div>
    );
  };
  
  export default RatingBar;
  
  


