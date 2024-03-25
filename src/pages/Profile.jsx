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
  const [gems, setGems] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {

    if (!userId) {
      navigate("/login");
    } else {
      getUser();
    }
  }, [reload]);

  const getUser = async () => {
    console.log("page refreashed")
    if (!userId) {
      navigate("/login");
    } else {
      //  await axios.get(`/getUserInfo/${userId}`)
      const response = await axios.get(`/getUserInfo/${userId}`)
      setUserInfo(response.data.user);
      const { data } = await axios.get(`/getGemsFromUserId/${userId}`);
      setGems(data.gems);
    }
  }

  useEffect(() => {
    getUser()
  }, [userId, navigate]);


  if (!userInfo) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  const gemCards = gems.map((gem, i) => {
    return (
      <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload} />
    )
  });

  return (
    <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <div>
        <Icon.Person style={{ width: '20%', height: '20%' }} />
      </div>

      <h1>{userInfo.email}</h1>
      <hr />
      <div style={{ textAlign: 'center' }} className="discover-container">
        <h2>Gems You Created</h2>
        <div className="discover-container">
          {gemCards}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h2>Comments</h2>
        <ul>
          {userInfo.comments.map(comment => (
            <h4 key={comment.commentId}>-{comment.text}</h4>
          ))}
        </ul>
      </div>
      {/* Add Edit button */}
      <button onClick={() => navigate(`/edit-gem/${gem.gemId}`)}>Edit</button>
    </div>
  )
}

export default Profile;
