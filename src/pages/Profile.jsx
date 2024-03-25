import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GemCard from "../components/GemCard";
import "../CSS/Profile.css"; // Import the CSS file for styling
import { Upload } from "react-bootstrap-icons";

function Profile() {
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [reload, setReload] = useState(false);
  const [imgUploadStatus, setImgUploadStatus] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else {
      axios
        .get(`/getUserInfo/${userId}`)
        .then((response) => {
          setUserInfo(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [userId, navigate, reload]);

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
          setImgUploadStatus(
            `${
              type.charAt(0).toUpperCase() + type.slice(1)
            } image uploaded successfully.`
          );
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

  if (!userInfo) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  const gemCards = userInfo.gems.map((gem, i) => (
    <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload} />
  ));

  return (
    <div className="profile-container">
      <div className="profile-image-section">
        {userInfo?.imgUrl && (
          <img
            src={userInfo.imgUrl}
            alt="User profile"
            className="profile-image"
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
          <Upload size={24} /> {/* Adjust size as needed */}
        </button>
        {userInfo?.headerImgUrl && (
          <img
            src={userInfo.headerImgUrl}
            alt="User header"
            className="header-image"
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
          <Upload size={50} /> {/* Adjust size as needed */}
        </button>
        {imgUploadStatus && <p className="upload-status">{imgUploadStatus}</p>}
      </div>

      <h1 className="user-email">{userInfo.email}</h1>
      <hr />

      <div className="gems-section">
        <h2>Gems You Created</h2>
        <ul className="gem-cards">{gemCards}</ul>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        <ul>
          {userInfo.comments.map((comment) => (
            <li key={comment.commentId} className="comment">
              {comment.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
