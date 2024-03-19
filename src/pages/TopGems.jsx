import React from "react";
import { useNavigate } from "react-router-dom";

function TopGems() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Top Gems</h1>
      <ol>
        <li>My house</li>
        <button onClick={() => navigate("/fullDetails")}>Learn more</button>
        <li>Park City Mountain Resort: Jupiter skiers left</li>
        <button onClick={() => navigate("/fullDetails")}>Learn more</button>
        <li>Snowbird: Git some cliffs on Gad 2</li>
        <button onClick={() => navigate("/fullDetails")}>Learn more</button>
        <li>Alpine Country Club: Back Nine</li>
        <button onClick={() => navigate("/fullDetails")}>Learn more</button>
        <li>Sunbrook Golf Club: Hidden Gem</li>
        <button onClick={() => navigate("/fullDetails")}>Learn more</button>
        <li>Lambert Park, MTB Trail: "Rodeo Down"</li>
        <button onClick={() => navigate("/fullDetails")}>Learn more</button>
        <li>Three Falls: Sliding Rock</li>
        <button onClick={() => navigate("/fullDetails")}>Learn more</button>
        <li>American Fork Canyon</li>
        <button onClick={() => navigate("/fullDetails")}>Learn more</button>
        <li>Jackson Hole Mountain Resort</li>
        <button onClick={() => navigate("/fullDetails")}>Learn more</button>
        <li>My Parents Garden</li>
        <button onClick={() => navigate("/fullDetails")}>Learn more</button>
      </ol>
    </div>
  );
}

export default TopGems;
