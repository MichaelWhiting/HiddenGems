

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateGem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const {gemId} = useParams()

  useEffect(() => {
    const fetchGemDetails = async () => {
      try {
        const response = await axios.get(`/getGem/${gemId}`);
        const { name, description, imgUrl, lat, lng } = response.data.gem;
        setName(name);
        setDescription(description);
        setImgUrl(imgUrl);
        setLat(lat);
        setLng(lng);
      } catch (error) {
        console.error('Error fetching gem details:', error);
      }
    };

    fetchGemDetails();
  }, [gemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend to update gem info
      const response = await axios.put(`/updateGem/${gemId}`, { name, description, imgUrl, lat, lng });

      if (response.status === 200) {
        // Optionally, you can display a success message or update the UI accordingly
        alert('Gem information updated successfully');
      }
    } catch (error) {
      console.error('Error updating gem:', error);
      alert('Error updating gem');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type='text'
        placeholder='Image URL'
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
        required
      />
      <input
        type='text'
        placeholder='Latitude'
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        required
      />
      <input
        type='text'
        placeholder='Longitude'
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        required
      />
      <button type='submit'>Update Gem</button>
    </form>
  );
};

export default UpdateGem;


