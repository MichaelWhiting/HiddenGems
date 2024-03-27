import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/UpdateGem.css";
import { Upload } from "react-bootstrap-icons";

const UpdateGem = () => {
  const { gemId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/getGem/${gemId}`);
        const { name, description, imgUrl, lat, lng } = response.data.gem;
        setName(name);
        setDescription(description);
        setImgUrl(imgUrl);
        setLat(lat);
        setLng(lng);
      } catch (error) {
        console.error("Error fetching gem data:", error);
      }
    };
    fetchData();
  }, [gemId]);

  useEffect(() => {
    // Load AWS SDK and configure it
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  function uploadFile(file) {
    const s3 = new window.AWS.S3();
    const fileName = `gems/${Date.now()}-${file.name}`;
    const params = {
      Bucket: "hidden-gems-dev-mountain",
      Key: fileName,
      Body: file,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        setSubmissionStatus("Failed to upload image.");
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
        setImgUrl(data.Location);
        setSubmissionStatus("File uploaded successfully!");
      }
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "imgUrl":
        setImgUrl(value);
        break;
      case "lat":
        setLat(value);
        break;
      case "lng":
        setLng(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/updateGem/${gemId}`,
        { name, description, imgUrl, lat, lng },
        { withCredentials: true }
      );
      setSubmissionStatus("Gem updated successfully!");
      navigate('/profile');
    } catch (error) {
      console.error("Error updating gem:", error);
      setSubmissionStatus("Error updating the gem. Please try again.");
    }
  };
  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="form-container">
      {submissionStatus && (
        <div className="submission-status">{submissionStatus}</div>
      )}
      <form className="cr-form" onSubmit={handleSubmit}>
        <p>Name:</p>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <p>Description:</p>
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
        <p>Image:</p>
        <button
          type="button"
          onClick={() => document.getElementById("fileUpload").click()}
          className="upload-button"
        >
          <Upload size={24} /> Upload New Image
        </button>
        <input
          type="file"
          id="fileUpload"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {imgUrl && (
          <div className="image-preview">
            <img
              src={imgUrl}
              alt="Uploaded Gem"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          </div>
        )}
        <p>Latitude:</p>
        <input
          type="number"
          name="lat"
          value={lat}
          onChange={handleChange}
          required
        />
        <p>Longitude:</p>
        <input
          type="number"
          name="lng"
          value={lng}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          Update Gem
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateGem;
