import React from 'react'
import RatingBar from './RatingBar.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";
import "../CSS/GemCard.css"

function GemCard(props) {
    const { gem, i, reload, setReload, showButtons } = props;
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
        <div key={i} className="gem-card" style={{textAlign: "center"}}>
            <h2 className="gem-location">
                {i + 1}. {gem.name}
            </h2>
            {gem?.imgUrl && <img src={gem.imgUrl} alt={gem.name} className="gem-image" />}
            {!gem?.imgUrl && 
                <div className="gem-image-placeholder">

                </div>
            }
            <p className="gem-description">{gem.description}</p>
            <div>
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
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            )}
            <Button
                variant='outline-info'
                className="hyper-link"
                onClick={() => {
                    navigate("/details", { state: { gemId: gem.gemId } })
                    console.log("button was clicked")
                }}
                style={{margin: "auto", marginTop: 5}}
            >
                Full Details
            </Button>
            {/* Adjust the navigation path as needed */}
        </div>
    )
}

export default GemCard