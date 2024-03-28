
import CreateGem from '../components/CreateGem.jsx';
import MapComponent from '../components/Map.jsx'
import { useState } from 'react';
import { Button } from "react-bootstrap";
import "../CSS/Home.css"
function Home() {
  const [showCreateGem, setShowCreateGem] = useState(false);

  const handleCreateGemClick = () => {
    setShowCreateGem(true)
  };

  return (
    <>
      {!showCreateGem && (
        <div className="home-page">
          <div className="home-map">
            <MapComponent />
          </div>
          <Button variant="info" onClick={handleCreateGemClick}>Create Gem</Button>
          <div>
            {/* gem cards of friends would go here*/}
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
