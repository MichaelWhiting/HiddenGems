import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditGem() {
  const { gemId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    // Add other fields here
  });

  useEffect(() => {
    axios.get(`/gems/${gemId}`)
      .then(response => {
        setFormData({
          name: response.data.name,
          description: response.data.description,
          // Set other fields as needed
        });
      })
      .catch(error => {
        console.error('Error fetching gem:', error);
      });
  }, [gemId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/gems/${gemId}`, formData);
      // Navigate back to profile page after successful update
      navigate('/profile');
    } catch (error) {
      console.error('Error updating gem:', error);
    }
  };

  return (
    <div>
      <h2>Edit Gem</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        {/* Add other fields here */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditGem;