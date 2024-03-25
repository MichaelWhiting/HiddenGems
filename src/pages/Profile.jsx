import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import GemCard from "../components/GemCard";

function Profile() {
  const userId = useSelector(state => state.userId);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [reload, setReload] = useState(false);
  const [imgUploadStatus, setImgUploadStatus] = useState('');

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
  }, [userId, navigate, reload]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.813.0.min.js";
    script.async = true;
    script.onload = () => {
      window.AWS.config.update({
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        region: import.meta.env.VITE_AWS_REGION
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const uploadFile = (file) => {
    const s3 = new window.AWS.S3();
    const params = {
      Bucket: 'hidden-gems-dev-mountain', // Replace with your bucket name
      Key: `${userId}-${file.name}`,
      Body: file,
    };
    s3.upload(params, async (err, data) => {
      if (err) {
        console.error('Error uploading file:', err);
        setImgUploadStatus('Failed to upload image.');
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
        // Here, update the user's profile imgUrl in your database
        try {
          await axios.put(`/updateUserProfileImg/${userId}`, { imgUrl: data.Location });
          setImgUploadStatus('Image uploaded successfully.');
          setReload(!reload); // Trigger reload to fetch updated user info
        } catch (error) {
          console.error('Error updating user profile image:', error);
          setImgUploadStatus('Failed to update profile image.');
        }
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  const gemCards = userInfo.gems.map((gem, i) => (
    <GemCard key={i} i={i} gem={gem} reload={reload} setReload={setReload} />
  ));

  return (
    <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', width: '30%', height: '30%' }}>
      <div>
        {/* Profile Image Section */}
        {userInfo?.imgUrl && <img src={userInfo.imgUrl} alt="no image" className="gem-image" />}

        <Icon.Person style={{ width: '20%', height: '20%' }} />
        <input type="file" onChange={handleFileChange} />
        {imgUploadStatus && <p>{imgUploadStatus}</p>}
      </div>
      
      <h1>{userInfo.email}</h1>
      <hr />
      
      {/* Gems Section */}
      <div style={{ textAlign: 'center' }}>
        <h2>Gems You Created</h2>
        <ul>{gemCards}</ul>
      </div>

      {/* Comments Section */}
      <div style={{ textAlign: 'center' }}>
        <h2>Comments</h2>
        <ul>
          {userInfo.comments.map(comment => (
            <li key={comment.commentId}>-{comment.text}</li> 
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
