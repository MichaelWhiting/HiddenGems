import {APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import React from 'react';

function MapComponent() {
    const position = {lat: 40.42082717117126, lng: -111.87613180911558};
    const [markers, setMarkers] = useState([]);
  
    const createMarker = (e) => {
      setMarkers([
        ...markers,
        {
          lat: e.detail.latLng.lat,
          lng: e.detail.latLng.lng
        }
      ])
    }
  
    const markerPoints = markers.map((marker, i) => {
      return <AdvancedMarker key={i} position={{lat: marker.lat, lng: marker.lng}}/>
    })

    return (
        <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
            <div style={{height: "100vh", width: "80%"}}>
                <Map mapId="8041ba05ec4f9f0a" center={position} zoom={15} onClick={createMarker}>
                    {markerPoints}
                </Map>
            </div>
        </APIProvider>
    )
}

export default MapComponent;