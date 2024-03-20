import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";


function Profile() {
  const userId = useSelector(state => state.userId);
  const navigate = useNavigate();

  const user = {
    username: "Michael",
    email: "michael@test.com"
  }

  useEffect(() => { // this checks if the user is logged in, if not they can't go the account page and have to login
    if (!userId) {
        navigate("/login")
    }
  }, []);

  return (
    <div style={{textAlign: "center", justifyContent: "center", alignItems: "center", width: "100%"}}>
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

export default Profile;
