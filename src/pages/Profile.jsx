import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/Profile.css"; // Import the CSS file for styling
import { Upload } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Friends from "../components/Friends.jsx";
import { useDispatch } from "react-redux";
// Components
import GemCard from "../components/GemCard";

function Profile() {
  const userId = useSelector((state) => state.userId);
  const backgroundColorState = useSelector(state => state.backgroundColor);
  const foregroundColorState = useSelector(state => state.foregroundColor);
  const navbarColorState = useSelector(state => state.navbarColor);

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [gems, setGems] = useState([]);
  const [reload, setReload] = useState(false);
  const [imgUploadStatus, setImgUploadStatus] = useState("");
  const [showFriends, setShowFriends] = useState(false); // State to control Friends component visibility
  const [navbarColor, setNavbarColor] = useState(navbarColorState); // Added for background color change
  const [backgroundColor, setBackgroundColor] = useState(backgroundColorState); // Added for background color change
  const [foregroundColor, setForegroundColor] = useState(foregroundColorState); // Added for background color change
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else {
      getUser();
    }
  }, [reload]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_NAVBAR",
      payload: navbarColor
    })
    console.log("updating navbar color")
  }, [navbarColor])

  useEffect(() => {
    dispatch({
      type: "UPDATE_BACKGROUND",
      payload: backgroundColor
    })
    console.log("updating background color")
  }, [backgroundColor])

  useEffect(() => {
    dispatch({
      type: "UPDATE_FOREGROUND",
      payload: foregroundColor
    })
    console.log("updating foreground color")
  }, [foregroundColor])

  const getUser = async () => {
    console.log("page refreshed");
    if (!userId) {
      navigate("/login");
    } else {
      try {
        const response = await axios.get(`/getUserInfo/${userId}`);
        setUserInfo(response.data.user);
        const { data } = await axios.get(`/getGemsFromUserId/${userId}`);
        setGems(data.gems);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/getUserInfo/${userId}`);
        setUserInfo(response.data.user);
        const { data } = await axios.get(`/getGemsFromUserId/${userId}`);
        setGems(data.gems);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.813.0.min.js";
    script.async = true;
    script.onload = () => {
      window.AWS.config.update({
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        region: import.meta.env.VITE_AWS_REGION,
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const uploadFile = (file, type) => {
    const s3 = new window.AWS.S3();
    const keyPrefix = type === "profile" ? "profile-images/" : "header-images/";
    const params = {
      Bucket: "hidden-gems-dev-mountain",
      Key: `${keyPrefix}${userId}-${file.name}`,
      Body: file,
    };
    s3.upload(params, async (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        setImgUploadStatus(`Failed to upload ${type} image.`);
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
        try {
          const updateEndpoint =
            type === "profile"
              ? `/updateUserProfileImg/${userId}`
              : `/updateUserHeaderImg/${userId}`;
          await axios.put(updateEndpoint, {
            [type === "profile" ? "imgUrl" : "headerImgUrl"]: data.Location,
          });
          setReload(!reload); // Trigger reload to fetch updated user info
        } catch (error) {
          console.error(`Error updating ${type} profile image:`, error);
          setImgUploadStatus(`Failed to update ${type} profile image.`);
        }
      }
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file, type);
    }
  };

  const handleFriendsButtonClick = () => {
    setShowFriends(!showFriends); // Toggle Friends component visibility
  };

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColorState
  }, [backgroundColor])

  if (!userInfo) {
    return <div>Loading...</div>; // Loading state
  }

  const gemCards = gems.map((gem, i) => (
    <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload} showButtons={true} />
  ));

  return (
    <div className="profile-container" style={{backgroundColor: foregroundColor}}>
      <div className="profile-image-section">
        {userInfo?.headerImgUrl && (
          <img
            src={userInfo.headerImgUrl}
            alt="User header"
            className="header-image"
            onClick={() => document.getElementById("headerFileInput").click()}
          />
        )}
        <input
          type="file"
          id="headerFileInput"
          onChange={(e) => handleFileChange(e, "header")}
          className="file-input"
          style={{ display: "none" }}
        />
        <button
          className="icon-button header-upload-btn"
          onClick={() => document.getElementById("headerFileInput").click()}
          aria-label="Upload header image"
        >
          <Upload size={24} />
        </button>
        {userInfo?.imgUrl && (
          <img
            src={userInfo.imgUrl}
            alt="User profile"
            className="profile-image"
            onClick={() => document.getElementById("fileInput").click()}
          />
        )}
        <input
          type="file"
          id="fileInput"
          onChange={(e) => handleFileChange(e, "profile")}
          className="file-input"
          style={{ display: "none" }}
        />
        <button
          className="icon-button"
          onClick={() => document.getElementById("fileInput").click()}
          aria-label="Upload profile image"
        >
          <Upload size={24} />
        </button>
      </div>
      <br />
      <h1 className="user-name">
        {userInfo.firstName} {userInfo.lastName}
      </h1>
      <h2 className="user-email">{userInfo.email}</h2>
      <hr />
      {/* Color Picker Button and Input */}
      <div style={{ margin: "20px 0" }}>
        <h4>Choose Navbar Color:</h4>
        <input 
          type="color" 
          value={navbarColor} 
          onChange={(e) => setNavbarColor(e.target.value)} 
        />
        <h4>Choose Background Color:</h4>
        <input 
          type="color" 
          value={backgroundColor} 
          onChange={(e) => setBackgroundColor(e.target.value)} 
        />
        <h4>Choose Foreground Color:</h4>
        <input 
          type="color" 
          value={foregroundColor} 
          onChange={(e) => setForegroundColor(e.target.value)} 
        />
      </div>
      <Button variant="outline-info" onClick={handleFriendsButtonClick}>
        Friends
      </Button>
      {showFriends && <Friends />}
      <div className="gems-section">
        <h2>Gems You Created</h2>
        <ul className="gem-cards">{gemCards}</ul>
      </div>
      <div className="comments-section">
        <h2>Comments</h2>
        <ul>
          {userInfo.comments.map((comment, index) => (
            <li key={index} className="comment">{comment.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
