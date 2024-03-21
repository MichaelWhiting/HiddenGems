import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import '../CSS/Details.css'
import RatingBar from '../components/RatingBar';

function DetailsPage() {
  const [gems, setGems] = useState([]);
  const [ratings, setRatings] = useState([]);
  const location = useLocation();
  const { gemId } = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    comment:'',
    
  });

  // This is the function that takes the input from the comment section and sends it to the database.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const commentData = {
        text: formData.comment, // Assuming formData.comment holds the comment text
        gemId: gemId, // Assuming gemId is the ID of the gem you're commenting on
      };
      

      const response = await axios.post('/createComment', {comment: commentData });
      

      const newComment = response.data.newComment;

      setGems(gems.map(gem => {
       
        if (response.data.success) {
          return {...gem, comments: [...gem.comments, newComment]};
        }
        return gem;
      }))
      setFormData({comment: ''});
      // Handle success (redirect user or show a success message)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (show error message to user)
    }
  };

  const gemCards = gems.map((gem, i) => {
    return (
      <div key={i} className='gem-card'>
        <h2 className="gem-location">{gem.name}</h2>
        <p className='gem-description'>{gem.description} </p>
        <p className='gem-description'>
        {gem.lat && <span>Latitude: {gem.lat}</span>}
        {gem.lng && <span>Longitude: {gem.lng}</span>}
        </p>
        <div>
        Enjoyability:
        <RatingBar rating={gem.enjoyAvg ? gem.enjoyAvg : 0} />
        Popularity:
        <RatingBar rating={gem.popularAvg ? gem.popularAvg : 0} />
      </div>
        {/* Display all comments */}
        {gem.comments && gem.comments.length > 0 ? (
          <div className="comments-section">
            <h6>Comments:</h6>
            {gem.comments.map((comment, index) => (
              <p key={index}>{comment.text}</p>
            ))}
          </div>
        ) : (
          <p>No comments yet</p>
        )}
        <form onSubmit={handleSubmit} className="comment-box">
        <textarea name="comment" value={formData.comment} onChange={handleChange}id="" cols="30" rows="10"></textarea>
        <input type="submit" value="Comment" />
        </form>
        <div>Map API below</div>
      </div>
    )
  })

  const fetchData = async () => {
    const gemRes = await axios.get(`/getGem/${gemId}`)
    setGems([gemRes.data.gem])
  }

  useEffect(() => {
    fetchData()
  }, [gemId])
  return (
    <div className="top-gems-container">
      <div className="gems-grid">
          {gemCards}
      </div>
    </div>
  )
}

export default DetailsPage