import React from 'react'
import RatingBar from './RatingBar.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

function GemCard(props) {
    const { gem, i, reload, setReload } = props;
    const navigate = useNavigate();
    return (
        <div key={i} className="gem-card" style={{textAlign: "center", marginTop: 5}}>
            <h2 className="gem-location">
                {i + 1}. {gem.name}
            </h2>
            {}
            <p className="gem-description" style={{minHeight: 70, maxHeight: 70, overflow: 'scroll'}}>{gem.description}</p>
            <hr/>
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
            <Button
                variant='outline-info'
                className="hyper-link"
                onClick={() => navigate("/details", { state: { gemId: gem.gemId } })}
                style={{margin: "auto"}}
            >
                Full Details
            </Button>
            {/* Adjust the navigation path as needed */}
        </div>
    )
}

export default GemCard