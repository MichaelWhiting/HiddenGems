import {APIProvider, Map, Marker, AdvancedMarker} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const gemMarkerIcon = {
    url: 'https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/512/Gem-Stone-3d-icon.png',
    scaledSize: {width: 55, height: 55}
};

function MapComponent(props) {
    const [gems, setGems] = useState([]); // all of the gems from the database
    const [isMapInitialized, setMapInitialized] = useState(false); // this makes it so once the map is loaded, the map can move moved around
    const initialCenter = props.gem ? { lat: props.gem.lat, lng: props.gem.lng } : { lat: 40.42082717117126, lng: -111.87613180911558 }; // the initial starting spot for the map, defaults to DevMountain
    // initialize 'initialCenter' as the lat/lng of the gem prop, if exists, else default to DM location?
   
    // in the future, we want to ask the user for their location and set the initial center to their location ^
    const [showEditingMarker, setShowEditingMarker] = useState(false);
    const { updateCords, isCreating } = props;
    const [cords, setCords] = useState({lat: 0, lng: 0});
    const navigate = useNavigate();

    const updatePos = (e) => {
        if (isCreating === true) {
            setShowEditingMarker(true);
            const lat = e.detail.latLng.lat;
            const lng = e.detail.latLng.lng;
            setCords({lat, lng});
            updateCords(lat, lng);
        } else {
            setShowEditingMarker(false);
        }
    }

    const getAllGems = async () => {
        const { data } = await axios.get("/getAllGems"); // gets all of the gems from the database
        setGems(data.gems); // updates the gems state variable
    }

    const gemMarkers = gems.map((gem) => { // for each of the gems in the gems array, this creates a marker on the map for them
      return <Marker 
      key={gem.gemId} 
      position={{lat: gem.lat, lng: gem.lng}} 
      title={gem.name} icon={gemMarkerIcon} 
      onClick={() => navigate("/details", { state: { gemId: gem.gemId }})}/>
    })

    useEffect(() => {
        getAllGems(); // on initial render, gets all of the gems from the database
    }, []);

    return (
        <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
            <div className='Map' style={{height: "100%", width: "100%", color:'red'}}>
                <Map 
                    mapId="8041ba05ec4f9f0a" // mapId from the API website
                    center={isMapInitialized ? undefined : initialCenter} // tells the map where to initially start
                    zoom={isMapInitialized ? undefined : 15}  // tells it to start off with 15 zoom
                    onIdle={() => setMapInitialized(true)} // once the map finishes loading, makes it so user can move map
                    mapTypeControl={false}
                    onClick={updatePos}
                >
                    {showEditingMarker ? <AdvancedMarker position={cords}/> : ""}
                    {gemMarkers} 
                    {/*  ^ loads all of the markers for the gems onto the map */}
                </Map>
            </div>
        </APIProvider>
    )
}

export default MapComponent;