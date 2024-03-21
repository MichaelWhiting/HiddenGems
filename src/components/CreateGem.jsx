import { useSelector } from "react-redux";
import React, { useState } from 'react';
import MapComponent from './Map'
import axios from 'axios'

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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
    setFormData({...formData, ["lat"]: newLat, ["lng"]: newLng})
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Gem Name: <input type="text" name="name" value={formData.name} onChange={handleChange} /></h1>
        <h2>Gem Description</h2>
        <textarea name="description" value={formData.description} onChange={handleChange} cols="30" rows="10"></textarea>
        <h2>Add an Image:<input type="file" name="theimage" onChange={handleChange} /></h2>
        <div style={{width: "30%"}}>
          <MapComponent updateCords={updateCords} isCreating={true}/>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default CreateGem
