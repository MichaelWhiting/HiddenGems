import React from 'react'
import RatingBar from './RatingBar.jsx';

function GemCard(props) {
    const { gem, i, reload, setReload } = props;

    return (
        <div key={i} className="gem-card">
            <h2 className="gem-location">
                {i + 1}. {gem.name}
            </h2>
            <p className="gem-description">{gem.description}</p>
            <div>
                Enjoyability:
                <RatingBar
                    reload={reload}
                    setReload={setReload}
                    gemId={gem.gemId}
                    rating={gem.enjoyAvg ? gem.enjoyAvg : 0}
                />
                Popularity:
                <RatingBar
                    reload={reload}
                    setReload={setReload}
                    gemId={gem.gemId}
                    rating={gem.popularAvg ? gem.popularAvg : 0}
                />
            </div>
            <button
                className="hyper-link"
                onClick={() => navigate("/details", { state: { gemId: gem.gemId } })}
            >
                Full Details
            </button>{" "}
            {/* Adjust the navigation path as needed */}
        </div>
    )
}

export default GemCard