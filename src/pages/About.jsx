import React from 'react';
import '../CSS/About.css'; // Assuming you have an About.css file for styling this component

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About</h1>
      <p className="about-content">
        This is a brief description of what our application does and why it's useful. 
        You can add more content here to explain your project's goals, 
        features, or any other information you think might be relevant to users.
      </p>
    </div>
  )
}

export default About;
