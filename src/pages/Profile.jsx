
import React from 'react'

function Profile() {
  const user = {
    username: "Michael",
    email: "michaelw@test.com"
  }

  return (
    <div style={{textAlign: "center", justifyContent: "center", alignItems: "center", width: "100%", background: "red"}}>
      <div >
        <Icon.Person style={{width: "20%", height: "20%"}}/>
      </div>
      <h1>{user.username}</h1>
      <h1>{user.email}</h1>
      <hr/>
      <div style={{textAlign: "center"}}>
        <h2>Posts</h2>
        <ul>
          <h4>-Place 1</h4>
          <h4>-Place 2</h4>
          <h4>-Place 3</h4>
        </ul>
      </div>
      <div style={{textAlign: "center"}}>
        <h2>Comments</h2>
        <ul>
          <h4>-Comment 1</h4>
          <h4>-Comment 2</h4>
          <h4>-Comment 3</h4>
        </ul>
      </div>
      <div style={{textAlign: "center"}}>
        <h2>Friends</h2>
        <ul>
          <h4>-Friend 1</h4>
          <h4>-Friend 2</h4>
          <h4>-Friend 3</h4>
        </ul>
      </div>
    </div>
  )
}

export default Profile
