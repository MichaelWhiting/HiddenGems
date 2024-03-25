import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../CSS/Details.css";
import RatingBar from "../components/RatingBar";
import MapComponent from "../components/Map";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from "react-bootstrap";
import { Trash } from 'react-bootstrap-icons';

function DetailsPage() {
  const [gems, setGems] = useState([]);
  const location = useLocation();
  const { gemId } = location.state || {};
  const [reload, setReload] = useState(false);
  const [formData, setFormData] = useState({ comment: "" });

  useEffect(() => {
    const fetchData = async () => {
      const gemRes = await axios.get(`/getGem/${gemId}`);
      setGems([gemRes.data.gem]);
    };
    fetchData();
  }, [gemId, reload]); // Include reload in the dependency array to refresh comments upon deletion

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentData = { text: formData.comment, gemId: gemId };
      const response = await axios.post("/createComment", { comment: commentData });
      if (response.data.success) {
        setReload(!reload); // Trigger a re-fetch of the comments
        setFormData({ comment: "" }); // Clear the form
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/deleteComment/${commentId}`);
      setReload(!reload); // Trigger a re-fetch of the comments
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="details-container">
      {gems.map((gem, i) => (
        <div key={i} className="details-grid">
          <div className="gem-details">
            <h2 className="gem-details-location">{gem.name}</h2>
            {gem?.imgUrl && (
              <img
                src={gem.imgUrl}
                alt={gem.name}
                className="gem-details-image"
              />
            )}
            <p className="gem-details-description">{gem.description}</p>
            <div className="gem-details-ratings">
              Enjoyability: <RatingBar rating={gem.enjoyAvg ? gem.enjoyAvg : 0} />
              Popularity: <RatingBar rating={gem.popularAvg ? gem.popularAvg : 0} />
            </div>
            <div className="gem-details-map">
              <MapComponent gem={gem} />
            </div>
          </div>
          <div className="comments">
            <div className="comments-section">
            {gem.comments && gem.comments.length > 0 ? (
              <>
                <h6>Comments:</h6>
                {gem.comments.map((comment, index) => (
                  <div key={index} className="comment-entry">
                    <p>{comment.text}</p>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(comment.commentId)}>
                      <Trash />
                    </Button>
                  </div>
                ))}
              </>
            ) : (
              <p>No comments yet</p>
            )}
            </div>
            <form onSubmit={handleSubmit} className="gem-details-comment-form">
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="comment-textarea"
                rows="4"
              ></textarea>
              <button type="submit" className="comment-submit-btn">Comment</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DetailsPage;
