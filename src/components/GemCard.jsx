import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";

// Components/Pages/CSS
import RatingBar from "./RatingBar.jsx";
import "../CSS/GemCard.css";
import editIcon from "../public/edit.svg";
import deleteIcon from "../public/delete.svg";

function GemCard(props) {
    const { gem, i, reload, setReload, showButtons } = props;
    const foregroundColorState = useSelector(state => state.foregroundColor);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/updateGem/${gem.gemId}`);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/deleteGem/${gem.gemId}`);
            setReload(!reload);
        } catch (error) {
            console.error("Error deleting gem:", error);
        }
    };

  return (
    <div key={i} className="gem-card" style={{ textAlign: "center",  backgroundColor: foregroundColorState}}>
      <h2 className="gem-location">
        {i + 1}. {gem.name}
      </h2>
      {gem?.imgUrl && (
        <img src={gem.imgUrl} alt={gem.name} className="gem-image" />
      )}
      {!gem?.imgUrl && <div className="gem-image-placeholder"></div>}
      <p className="gem-description">{gem.description}</p>
      <div className="rating-bar-button-container">
      <div className="enjpop">
        Enjoyability:
        <RatingBar
          reload={reload}
          setReload={setReload}
          gemId={gem.gemId}
          rating={gem.enjoyAvg ? gem.enjoyAvg : 0}
          type="enjoyability"
        />
        Popularity:
        <RatingBar
          reload={reload}
          setReload={setReload}
          gemId={gem.gemId}
          rating={gem.popularAvg ? gem.popularAvg : 0}
          type="popularity"
        />
      </div>
      {showButtons && (
        <div>
          <button className="icon-button edit-button" onClick={handleEdit}>
            Edit
          </button>
          <button className="icon-button delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
    );
}

export default GemCard;
