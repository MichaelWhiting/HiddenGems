
import CreateGem from '../components/CreateGem.jsx';
import MapComponent from '../components/Map.jsx'
import { useState } from 'react';

function Home() {
  const [showCreateGem, setShowCreateGem] = useState(false);

  const handleCreateGemClick = () => {
    setShowCreateGem(true)
  };

  return (
    <>
    {!showCreateGem && (
      <>
        <MapComponent />
        <button onClick={handleCreateGemClick}>Create Gem</button>
      </>
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
