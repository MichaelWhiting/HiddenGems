import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/About.css";
import GemCard from "../components/GemCard";
import { useSelector } from "react-redux";

function About() {
  const [gems, setGems] = useState([]);
  const [userProfiles, setUserProfiles] = useState({}); // State to store user profile details
  const navigate = useNavigate();
  const foregroundColor = useSelector((state) => state.foregroundColor);

  // Function to fetch user profile
  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`/getUserInfo/${userId}`);
      return response.data.user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  // Function to fetch all required data
  const fetchData = async () => {
    try {
      const gemRes = await axios.get("/getAllGems");
      setGems(gemRes.data.gems);

      // Fetch user profiles
      const userIds = [1, 2, 3, 4]; // Replace with actual user IDs
      const profiles = {};
      for (const id of userIds) {
        const user = await fetchUserProfile(id);
        if (user) {
          profiles[id] = user;
        }
      }
      setUserProfiles(profiles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render user info and favorite gem
  const renderPersonBox = (userId, name) => {
    const user = userProfiles[userId];
    const favoriteGem = gems.find((gem) => gem.userId === userId); // Assume you relate gems to users via userId

    return (
      <div className="person-box" style={{ backgroundColor: foregroundColor }}>
        <div className="person-info">
          {user && (
            <>
              <img src={user.imgUrl} alt={name} className="profile-pic" />
              <h6>{name}-</h6>
            </>
          )}
           
              <p><strong>His top gem:</strong></p>
             
        </div>
       <div className="gem-card-container">
        
        {favoriteGem && <GemCard gem={favoriteGem} />}
        </div>
      </div>
    );
  };

  return (
    <div className="about-container">
      <h1 className="about-title">About the Creators</h1>
     
      {renderPersonBox(1, "Michael Whiting")}
      {renderPersonBox(2, "Josh Lara")}
      {renderPersonBox(3, "Jesse Garlick")}
      {renderPersonBox(4, "Ty Cannon")}
      {/* ... other person boxes */}
      <div className="m-button-container">
        <button className="m-button" onClick={() => navigate("/2048")}>
          Hidden Gems After Dark
        </button>
      </div>
    </div>
  );
}

export default About;