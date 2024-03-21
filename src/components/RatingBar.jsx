import React from 'react';
import '../CSS/RatingBar.css';
import GemIcon from './GemIcon.jsx'



  
  
  const RatingBar = ({ rating }) => {
    
    const filledGems = rating / 20; // Convert to a scale of 5.
  
    return (
      <div className="rating-container">
        {Array.from({ length: 5 }).map((_, i) => {
          const fillLevel = Math.max(0, Math.min(100, (filledGems - i) * 100));
          return <GemIcon key={i} rating={fillLevel} enjoyRating={rating} />;
        })}
        <label>{rating}</label>
      </div>
    );
  };
  
  export default RatingBar;
  
  


