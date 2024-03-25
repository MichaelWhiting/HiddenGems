import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";



function Profile() {
  
  const userId = useSelector(state => state.userId);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // const user = {
  //   username: "Michael",
  //   email: "michael@test.com"
  // }

  useEffect(() => { // this checks if the user is logged in, if not they can't go the account page and have to login
    if (!userId) {
        navigate("/login")
    } else {
      // Fetch user information from the backend
      fetch(`/getUserInfo/${userId}`)
        .then(response => response.json())
        .then(data => setUserInfo(data.user))
        .catch(error => console.error('Error fetching user info:', error));
    }
  }, [userId, navigate]);

  if (!userInfo) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  const gemCards = userInfo.gems.map((gem) => (
    <div key={gem.gemId} className="gem-card">
        <h2 className="gem-location">
           {gem.gemId + 1}. {gem.name}
         </h2>
         <p className="gem-description">{gem.description}</p>
         
        <button
          className="hyper-link"
          onClick={() => navigate("/details", { state: { gemId: gem.gemId } })}
        >
          Full Details
        </button>{" "}
        {/* Adjust the navigation path as needed */}
      </div>
  ))

  return (
    <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <div>
        <Icon.Person style={{ width: '20%', height: '20%' }} />
      </div>
      {/* <h1>{userInfo.username}</h1> */}
      <h1>{userInfo.email}</h1>
      <hr />
      <div style={{ textAlign: 'center' }}>
        <h2>Posts</h2>
        <ul>
          {gemCards}
          {/* <CreateGem gem={gem} /> */}
        </ul>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h2>Comments</h2>
        <ul>
          {/* {userInfo.Comments.map(comment => (
            <h4 key={comment.id}>-{comment.content}</h4> 
          ))} */}
        </ul>
      </div>
      {/* Similarly for Friends if you have that relation in your backend */}
    </div>
  )
}

export default Profile;
