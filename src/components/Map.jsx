import { APIProvider, Map, Marker, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"


// Icons
import pointerIcon from "../public/pointer.svg";

import red1 from "../public/red1.png";
import red2 from "../public/red2.png";
import yellow1 from "../public/yellow1.png";
import yellow2 from "../public/yellow2.png";
import green1 from "../public/green1.png";
import green2 from "../public/green2.png";
import blue1 from "../public/blue1.png";
import purple1 from "../public/purple1.png";

function MapComponent(props) {
    const [gems, setGems] = useState([]); // all of the gems from the database
    const [isMapInitialized, setMapInitialized] = useState(false); // this makes it so once the map is loaded, the map can move moved around
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const initialCenter = props.gem ? { lat: props.gem.lat, lng: props.gem.lng } : { lat: lat, lng: lng }; // the initial starting spot for the map, defaults to DevMountain
    // initialize 'initialCenter' as the lat/lng of the gem prop, if exists, else default to DM location?
    // const [initialCenter, setInitialCenter] = useState();
// 
    useState(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
          } else {
            console.log("Geolocation not supported");
          }
          
          function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLat(latitude)
            setLng(longitude);
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          }
          function error() {
            console.log("Unable to retrieve your location");
          }
    })

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

    const getGemMarkerIcon = (gem) => {
        let iconUrl = "";
        const enjoyAvg = gem.enjoyAvg;

        if (enjoyAvg >= 95) {
            iconUrl = purple1; 
        } else if (enjoyAvg >= 90) {
            iconUrl = blue1;
        } else if (enjoyAvg >= 75) {
            iconUrl = green2;
        } else if (enjoyAvg >= 60) {
            iconUrl = green1;
        } else if (enjoyAvg >= 45) {
            iconUrl = yellow2;
        } else if (enjoyAvg >= 30) {
            iconUrl = yellow1;
        } else if (enjoyAvg >= 15) {
            iconUrl = red2;
        } else {
            iconUrl = red1;
        }
        return { url: iconUrl, scaledSize: {width: 55, height: 55}};
    }

    const gemMarkers = gems.map((gem) => { // for each of the gems in the gems array, this creates a marker on the map for them
      return <Marker 
      key={gem.gemId} 
      position={{lat: gem.lat, lng: gem.lng}} 
      title={gem.name} icon={getGemMarkerIcon(gem)} 
      onClick={() => {
        if (isCreating) {
            return;
        } else {
            navigate("/details", { state: { gemId: gem.gemId }})}}
        }
        />
    })

    useEffect(() => {
        getAllGems(); // on initial render, gets all of the gems from the database
    }, []);

    return (
        <div className='Map' style={{height: "100%", width: "100%", color:'red'}}>
            <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
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
            </APIProvider>
        </div>
    )
}

export default MapComponent;