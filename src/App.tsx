
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import NameForm from './NameForm'
import {Hello} from './Hello'
import React, { useRef, useState, useEffect, SyntheticEvent } from "react";



function App() {
  const [markers, setMarkers] = useState<any[]>([]);


  const mimicClose = () => {
    const popupclose = document.querySelector('.leaflet-popup-close-button')
    const closeOnSubmit = document.querySelector('.closeOnSubmit')
    closeOnSubmit && popupclose?.dispatchEvent(new Event('click'))
  };

  useEffect(() => {
    axios("http://localhost:3002/api/markers").then((response) => {
      setMarkers(response.data);
      console.log(response.data);
    });

  }
  , []);

  return(
    <div style={{ width: '100%', height: '70vh' }}>
      <MapContainer center={[45, -123]} zoom={5} style={{ width: '100%', height: '100%' }} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        { markers.map((marker, index) => (
          <Marker
          key={index}
          position={[marker.lat, marker.lng]}>
           <Popup>
            <NameForm
            position={[marker.lat, marker.lng]}
            onClosePopup={mimicClose}
            data={marker.data}
            ></NameForm>
          </Popup>
            
          </Marker>
        ))}
      </MapContainer>

    </div>
  )
}

export default App
