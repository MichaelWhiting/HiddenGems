import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import MapComponent from './Map';
import axios from 'axios';
import '../CSS/CreateGem.css';

function CreateGem() {
  const userId = useSelector(state => state.userId);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imgUrl: '',
    lat: 0.0,
    lng: 0.0,
    userId
  });

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
      Bucket: 'hidden-gems-dev-mountain',
      Key: file.name,
      Body: file
    };

    s3.upload(params, function(err, data) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      setFormData(currentFormData => ({ ...currentFormData, imgUrl: data.Location }));
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name !== "" && formData.description !== "" && formData.lat !== 0 && formData.lng !== 0) {
      console.log("None of the text fields are empty and a marker has been selected, now going to save to database")
      try {
        if (userId) {
          console.log("user IS logged in and is going to create")
          await axios.post('/createGem', formData);
          console.log(formData);
        } else {
          console.log("user is NOT logged in and is not going to create")
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const updateCords = (newLat, newLng) => {
    setFormData({...formData, lat: newLat, lng: newLng})
  };

  return (
    <>
      <div className="cr-container">
        <form onSubmit={handleSubmit} className="cr-form">
          <h1>Gem Name: <input type="text" name="name" value={formData.name} onChange={handleChange} /></h1>
          <h2>Gem Description</h2>
          <textarea name="description" value={formData.description} onChange={handleChange} cols="30" rows="10"></textarea>
          <h2>Add an Image:<input type="file" name="theimage" onChange={handleChange} /></h2>
          <div className="cr-map-container">
            <MapComponent updateCords={updateCords} isCreating={true}/>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default CreateGem;
