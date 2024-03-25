
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import '../CSS/Discover.css'
import RatingBar from '../components/RatingBar.jsx';
import GemCard from '../components/GemCard.jsx';


function Discover() {
  const [gems, setGems] = useState([]);
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const gemRes = await axios.get("/getAllGems");
      setGems(gemRes.data.gems);
    };

    fetchData();
  }, [reload]);

  const gemCards = gems.map((gem, i) => {
    return (
      <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload}/>
    )
  });

  const fetchData = async () => {
    const gemRes = await axios.get("/getAllGems");
    setGems(gemRes.data.gems)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
    <div className='discover'>
      <h1>GEMS YOU MIGHT LIKE</h1>
      <div className="discover-container">
      <div className='gems-grid'>
        {gemCards}
      </div>
      </div>
    </div>
    </>
  )
}

export default Discover


