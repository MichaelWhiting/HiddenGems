import React, { useState } from 'react';
import MapComponent from './Map'
import axios from 'axios'


function CreateGem() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imgUrl: '',
    lat: 0.0,
    lng: 0.0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)

      await axios.post('/createGem', formData);
      console.log('should have saved')
      // Handle success (redirect user or show a success message)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Gem Name: <input type="text" name="name" value={formData.name} onChange={handleChange} /></h1>
        <h2>Gem Description</h2>
        <textarea name="description" value={formData.description} onChange={handleChange} cols="30" rows="10"></textarea>
        <h2>Add an Image:<input type="file" name="theimage" onChange={handleChange} /></h2>
        <MapComponent />
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default CreateGem
