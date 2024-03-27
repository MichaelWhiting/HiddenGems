import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/UpdateGem.css";
import { Upload } from "react-bootstrap-icons";

const UpdateGem = () => {
  const { gemId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imgUrl: "",
    lat: 0.0,
    lng: 0.0,
  });
  const [submissionStatus, setSubmissionStatus] = useState("");

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
        setFormData((prevState) => ({ ...prevState, imgUrl: data.Location }));
        setSubmissionStatus("File uploaded successfully!");
      }
    });
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/updateGem/${gemId}`,
        { ...formData },
        {
          withCredentials: true,
        }
      );
      setSubmissionStatus("Gem updated successfully!");
    } catch (error) {
      console.error("Error updating gem:", error);
      setSubmissionStatus("Error updating the gem. Please try again.");
    }
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
          value={formData.name}
          onChange={handleChange}
          required
        />
        <p>Description:</p>
        <textarea
          name="description"
          value={formData.description}
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
        {formData.imgUrl && (
          <div className="image-preview">
            <img
              src={formData.imgUrl}
              alt="Uploaded Gem"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          </div>
        )}
        <p>Latitude:</p>
        <input
          type="number"
          name="lat"
          value={formData.lat}
          onChange={handleChange}
          required
        />
        <p>Longitude:</p>
        <input
          type="number"
          name="lng"
          value={formData.lng}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          Update Gem
        </button>
      </form>
    </div>
  );
};

export default UpdateGem
