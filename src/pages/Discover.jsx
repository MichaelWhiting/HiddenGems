

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import '../CSS/Discover.css'
import RatingBar from '../components/RatingBar.jsx';
import GemCard from '../components/GemCard.jsx';


function Discover() {
  const [query, setQuery] = useState('');
  const [gems, setGems] = useState([]);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState({
    1: false, 2: false, 3: false, 4: false, 5: false, 6: false,
    7: false, 8: false, 9: false, 10: false, 11: false, 12: false
  }); // Track selected tags

  const handleSearch = async () => {
    try {
      const searchRes = await axios.get(`/searchGems/${query}`);
      setGems(searchRes.data.gems);
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
  
  const anyTagsSelected = () => {
    for (let i = 1; i <= 12; i++) {
      if (selectedTags[i]) {
        return true;
      }
    }
    return false;
  }

  const gemCards = anyTagsSelected() ? gems.filter((gem) => {
    for (const tag of gem.tags) { // loops through each of the tags on the gem
      if (selectedTags[tag.tagId]) { // checks to see if that tag is selected
        return true; // means the gem has has one of tags selected, and will be kept.
      }
    }
    return false; // this means that gem did not have ANY of the tags selected, so we will filter it out
  }).map((gem, i) => { // after it filters those gems by tags, it will create a card for the remaining gems
    return (
      <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload} showButtons={false} />
    )
  })
   : gems.map((gem, i) => { // after it filters those gems by tags, it will create a card for the remaining gems
    return (
      <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload} showButtons={false} />
    )
  })


  const fetchData = async () => {
    const gemRes = await axios.get("/getAllGems");
    setGems(gemRes.data.gems)
  }

  useEffect(() => {
    if (query !== "") {
      handleSearch();
    } else {
      fetchData();
    }
  }, [query]);

  const fetchTags = async () => {
    const tags = await axios.get("/getAllTags");
    setTags(tags.data.tags)
    console.log(tags.data.tags)
  }

  useEffect(() => {
    fetchTags()
    fetchData();
  }, []);


  return (
    <>
      <div className='discover'>
        <h1>GEMS YOU MIGHT LIKE</h1>
        <div className="header">
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
          <div class="tags-container">
            {/* <h5 className='TagTitle'>Filter by Tag</h5> */}
           

            {tags.map((tag, i) => (
              <button
              id='tagsButton' 
              key={`tag-${tag.tagId}`} 
              value={tag.tagName}
              onClick={() => {
                setSelectedTags({ ...selectedTags, [i + 1]: !selectedTags[i + 1] });
              }}
              className={selectedTags[i + 1] ? 'selected' : ''}
              >
                {tag.tagName}
                </button>
              
              ))}
             
          </div>
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