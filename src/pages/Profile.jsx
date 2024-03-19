import * as Icon from "react-bootstrap-icons";
import React from 'react'

function Profile() {
  const user = {
    username: "Michael",
    email: "michaelw@test.com"
  }

  return (
    <div style={{textAlign: "center"}}>
      <div >
        <Icon.Person style={{width: "20%", height: "20%"}}/>
      </div>
      <h1>{user.email}</h1>
      <h1>{user.username}</h1>

      <div style={{textAlign: "center"}}>
        <ul>
          <li>Place 1</li>
          <li>Place 2</li>
          <li>Place 3</li>
        </ul>
      </div>
      <div style={{textAlign: "center"}}>
        <ul>
          <li>Friend 1</li>
          <li>Friend 2</li>
          <li>Friend 3</li>
        </ul>
      </div>
    </div>
  )
}

export default Profile
