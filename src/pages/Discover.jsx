
// import React, {useEffect, useState} from 'react'
// import axios from 'axios'
// import {useNavigate} from "react-router-dom"
// import '../CSS/Discover.css'
// import RatingBar from '../components/RatingBar.jsx';
// import GemCard from '../components/GemCard.jsx';


// function Discover() {
//   const [gems, setGems] = useState([]);
//   const [ratings, setRatings] = useState([]);
//   const navigate = useNavigate();
//   const [reload, setReload] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const gemRes = await axios.get("/getAllGems");
//       setGems(gemRes.data.gems);
//     };

//     fetchData();
//   }, [reload]);

//   const gemCards = gems.map((gem, i) => {
//     return (
//       <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload} showButtons={false}/>
//     )
//   });

//   const fetchData = async () => {
//     const gemRes = await axios.get("/getAllGems");
//     setGems(gemRes.data.gems)
//   }

//   useEffect(() => {
//     fetchData()
//   }, []);

//   return (
//     <>
//     <div className='discover'>
//       <h1>GEMS YOU MIGHT LIKE</h1>
//       <div className="discover-container">
//       <div className='gems-grid'>
//         {gemCards}
//       </div>
//       </div>
//     </div>
//     </>
//   )
// }

// export default Discover

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/Discover.css';
import RatingBar from '../components/RatingBar.jsx';
import GemCard from '../components/GemCard.jsx';

function Discover() {
  const [query, setQuery] = useState('');
  const [gems, setGems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const gemRes = await axios.get("/getAllGems");
      setGems(gemRes.data.gems);
    };

    fetchData();
  }, [reload]);

  const gemCards = (searchResults && searchResults.length > 0 ? searchResults : gems).map((gem, i) => {
    return (
      <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload} showButtons={false} />
    );
  });

  const handleSearch = async () => {
    try {
      const searchRes = await axios.get(`/searchGems/${query}`);
      setSearchResults(searchRes.data.gems);
    } catch (error) {
      console.error("Error searching gems:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  useEffect(() => {
    handleSearch();
  }, [query])

  return (
    <>
      <div className='discover'>
        <h1>GEMS YOU MIGHT LIKE</h1>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search gems...'
            id='searchInput' // Add a unique id attribute
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="discover-container">
          <div className='gems-grid'>
            {gemCards}
          </div>
        </div>
      </div>
    </>
  );
}

export default Discover;