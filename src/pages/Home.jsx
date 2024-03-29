
import CreateGem from '../components/CreateGem.jsx';
import MapComponent from '../components/Map.jsx'
import { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import "../CSS/Home.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GemCard from '../components/GemCard.jsx';

function Home() {
  const userId = useSelector(state => state.userId);
  const [showCreateGem, setShowCreateGem] = useState(false);
  const [followingGems, setFollowingGems] = useState([]);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  const handleCreateGemClick = () => {
    setShowCreateGem(true)
  };

  const getFollowingGems = async () => {
    const gemsToUpdate = [];
    const { data } = await axios.get("/getFriends")
    const friends = data.friends

    for (let i = 0; i < friends.length; i++) {
      const res = await axios.get(`/getFollowingGems/${friends[i].userId}`);
      gemsToUpdate.push(...res.data.gems);
      if (i === friends.length - 1) {
        setFollowingGems(gemsToUpdate);
      }
    }
  }

  useEffect(() => {
    if (userId) {
      getFollowingGems()
    } else {
      console.log("is this running on each refresh?")
      navigate("/login")
   }
  }, [reload])

  const gemCards = followingGems.map((gem, i) => (
    <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload} showButtons={false}/>
  ));
  
  return (
    <>
      {!showCreateGem && (
        <div className="home-page center">
          <label className="title">Gems Near You</label>
          <div className="home-map">
            <MapComponent />
          </div>
            <Button 
              variant="info" 
              className="create-gem-btn"
              onClick={handleCreateGemClick}>
              Create Gem
            </Button>
          <div>
            <label className="sub-title">Following Feed:</label>
            <div>
              {gemCards}
            </div>
          </div>
        </div>
      )}
      {showCreateGem && <CreateGem />}
    </>
  )
}

{/* <div>
<input type="text" placeholder='Search Bar' />
</div>
<div>
  <ul>
      <li>Location</li>
      <li>Food</li>
      <li>Adventure</li>
  </ul>
</div>
<div>Gems Near You</div>
<div style={{background: 'blue'}}>Map</div>
<button>Create Post</button>
<button>Git List</button> */}

export default Home
