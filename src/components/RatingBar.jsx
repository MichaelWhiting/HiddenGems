// RatingBar.jsx
import React from 'react';
import '../CSS/RatingBar.css'; // Ensure you create this CSS file in your project

const RatingBar = ({ rating }) => {
  const validRating = Math.min(100, Math.max(0, rating));
  const ratingStyle = { width: `${validRating}%` };

  return (
    <div className="rating-bar-background">
      <div className="rating-bar-fill" style={ratingStyle}></div>
    </div>
  );
};

export default RatingBar;
