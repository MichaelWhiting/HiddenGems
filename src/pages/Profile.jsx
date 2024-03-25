import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import GemCard from "../components/GemCard";



function Profile() {
  
  const userId = useSelector(state => state.userId);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!userId) {
        navigate("/login");
    } else {
        axios.get(`/getUserInfo/${userId}`)
            .then(response => {
                setUserInfo(response.data.user);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }
}, [userId, navigate]);

  if (!userInfo) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  const gemCards = userInfo.gems.map((gem, i) => {
    return (
      <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload}/>
    )
  });

  return (
    <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <div>
        <Icon.Person style={{ width: '20%', height: '20%' }} />
      </div>
     
      <h1>{userInfo.email}</h1>
      <hr />
      <div style={{ textAlign: 'center' }}>
        <h2>Gems You Created</h2>
        <ul>
          {gemCards}

        </ul>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h2>Comments</h2>
        <ul>
          {userInfo.comments.map(comment => (
            <h4 key={comment.id}>-{comment.text}</h4> 
          ))}
        </ul>
      </div>
      {/* Similarly for Friends if you have that relation in your backend */}
    </div>
  )
}

export default Profile;
