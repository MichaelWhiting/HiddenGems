import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MapComponent from "./Map";
import axios from "axios";
import "../CSS/CreateGem.css";
import { useNavigate } from "react-router-dom";
import { Upload } from "react-bootstrap-icons";

function CreateGem() {
  const userId = useSelector((state) => state.userId);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imgUrl: "",
    lat: 0.0,
    lng: 0.0,
    userId,
  });

  const handleFileClick = () => {
    document.getElementById('fileUpload').click(); // Triggers the hidden file input
  };

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

  const handleChange = (e) => {
    if (e.target.name === "theimage") {
      const file = e.target.files[0];
      if (file) {
        uploadFile(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  function uploadFile(file) {
    const s3 = new window.AWS.S3();
    const params = {
      Bucket: "hidden-gems-dev-mountain",
      Key: file.name,
      Body: file,
    };

    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      setFormData((currentFormData) => ({
        ...currentFormData,
        imgUrl: data.Location,
      }));
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name !== "" &&
      formData.description !== "" &&
      formData.lat !== 0 &&
      formData.lng !== 0
    ) {
      console.log("Validating form data before submission");
      try {
        if (userId) {
          const res = await axios.post("/createGem", formData);
          console.log("Form submitted successfully", formData);
          // Display success message and optionally reset form here
          setSubmissionStatus("Gem created successfully!");
          setIsSubmitted(true);

          // Here's where you might navigate after a successful submission
          navigate("/details", { state: { gemId: res.data.newGem.gemId } });

          // Reset form (optional)
          setFormData({
            name: "",
            description: "",
            imgUrl: "",
            lat: 0.0,
            lng: 0.0,
            userId,
          });
        } else {
          console.log("User is not logged in");
          // Handle the case where the user is not logged in
          setSubmissionStatus("You need to be logged in to create a gem.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmissionStatus("Error submitting the form. Please try again.");
      }
    } else {
      // Handle validation failure
      setSubmissionStatus(
        "Please fill in all required fields and select a location."
      );
    }
  };

  const updateCords = (newLat, newLng) => {
    setFormData({ ...formData, lat: newLat, lng: newLng });
  };

  return (
    <>
      <div className="cr-container">
        {submissionStatus && (
          <div className="submission-status">{submissionStatus}</div>
        )}
        <form onSubmit={handleSubmit} className="cr-form">
          <h1>
            Gem Name:{" "}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </h1>
          <h2>Gem Description</h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            cols="30"
            rows="10"
          ></textarea>
          <h2>Add an Image:</h2>
          <button type="button" onClick={handleFileClick} className="upload-button">
            <Upload size={24} /> {/* Adjust size as needed */}
          </button>
          <input
            type="file"
            name="theimage"
            id="fileUpload"
            onChange={handleChange}
            style={{ display: "none" }} // Hide the actual file input
          />
          <div className="cr-map-container">
            <MapComponent updateCords={updateCords} isCreating={true} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default CreateGem;
