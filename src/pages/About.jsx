
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import RatingBar from '../components/RatingBar';
import axios from 'axios';
import '../CSS/About.css'; // Assuming you have an About.css file for styling this component
import GemCard from '../components/GemCard';

function About() {
  const [gems, setGems] = useState([]);
  const [michaelGemId, setMichaelGemId] = useState(null);
  const [joshGemId, setJoshGemId] = useState(null);
  const [jesseGemId, setJesseGemId] = useState(null);
  const [tyGemId, setTyGemId] = useState(null);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const gemRes = await axios.get("/getAllGems");
    setGems(gemRes.data.gems);
    // Assuming each person has a favorite gem ID stored in the database or elsewhere
    // Modify this logic according to how you retrieve each person's favorite gem ID
    setMichaelGemId(1); // Example favorite gem ID for Michael
    setJoshGemId(2); // Example favorite gem ID for Josh
    setJesseGemId(3); // Example favorite gem ID for Jesse
    setTyGemId(4); // Example favorite gem ID for Ty
  }

  useEffect(() => {
    fetchData();
  }, [reload]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="about-container">
      <h1 className="about-title">The Gems Behind Hidden Gems</h1>
      <p className="about-content">
        This is a brief description of what our application does and why it's useful.
        You can add more content here to explain your project's goals,
        features, or any other information you think might be relevant to users.
      </p>
      <div className="person-box">
        <div className="person-info">
          <h5>Michael Whiting</h5>
          <p>About Michael</p>
          <h6>Michael's Favorite Gem:</h6>
        </div>
        <div className="gem-box">
        {gems.map((gem, i) => {
          if (gem.gemId === michaelGemId) {
            return (
              <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload}/>
              );
          }
          return null;
        })}
        </div>
      </div>

      <div className="person-box">
        <div className="person-info">
          <h5>Josh Lara</h5>
          <p>About Josh</p>
          <h6>Josh's Favorite Gem</h6>
        </div>
        
        <div className="gem-box">
        {gems.map((gem, i) => {
          if (gem.gemId === joshGemId) {
            return (
              <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload}/>
            );
          }
          return null;
        })}
        </div>
      </div>

      <div className="person-box">
        <div className="person-info">
          <h5>Jesse Garlic</h5>
          <p>About Jesse</p>
          <h6>Jesse's Favorite Gem</h6>
        </div>
        
        <div className="gem-box">
        {gems.map((gem, i) => {
          if (gem.gemId === jesseGemId) {
            return (
              <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload}/>
            );
          }
          return null;
        })}
        </div>
      </div>

      <div className="person-box">
        <div className="person-info">
          <h5>Ty Cannon</h5>
          <p>About Ty</p>
          <h6>Ty's Favorite Gem</h6>
        </div>
        
        <div className="gem-box">
        {gems.map((gem, i) => {
          if (gem.gemId === tyGemId) {
            return (
              <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload}/>
            );
          }
          return null;
        })}
        </div>
      </div>

      {/* Repeat the same pattern for other persons */}

      <div className="m-button-container">
        <button className="m-button" onClick={() => navigate("/2048")}>Hidden Gems After Dark</button>
      </div>
    </div>
  );
}

export default About;