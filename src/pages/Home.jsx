import React from 'react'

function Home() {
  return (
    <>
    <div>
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
    <button>Git List</button>

    </>
  )
}

export default Home
