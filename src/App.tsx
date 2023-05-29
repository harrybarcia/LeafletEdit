
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import NameForm from './NameForm'
import {Hello} from './Hello'
import React, { useRef, useState, useEffect, SyntheticEvent } from "react";
import { useForm } from './useForm'
import { map, popup } from 'leaflet'
import $ from 'jquery';


function App() {
  const [markers, setMarkers] = useState<any[]>([]);
  const [activePopup, setActivePopup] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const closeIconRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<Marker>(null);
  const [popupOpen, setPopupOpen] = useState(false);


  const mimicClose = () => {
    const popupclose = document.querySelector('.leaflet-popup-close-button')
    const activePopup = document.querySelector('.leaflet-popup')
    const closeOnSubmit = document.querySelector('.closeOnSubmit')

    console.log("closeOnSubmit", closeOnSubmit)
    closeOnSubmit && popupclose?.dispatchEvent(new Event('click'))
    
    setPopupOpen(false);

  };

  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };


  useEffect(() => {
    axios("http://localhost:3002/api/users").then((response) => {
    });
  }, []);

  useEffect(() => {
    axios("http://localhost:3002/api/markers").then((response) => {
      setMarkers(response.data);
      console.log(response.data);
    
    });

  }
  , []);


  const handleFormSubmit = (event: SyntheticEvent, popupId: string) => {
    event.preventDefault();
    setActivePopup(popupId);
  };
  return(
    <div style={{ width: '100%', height: '70vh' }}>
      <MapContainer ref={mapRef}  center={[45, -123]} zoom={5} style={{ width: '100%', height: '100%' }} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        { markers.map((marker, index) => (
          <Marker
          eventHandlers={{ click: togglePopup }}
          ref={markerRef} 
          key={index}
          position={[marker.lat, marker.lng]}>
           <Popup>
            <div data-popup-id={marker.uid}>
              <h2>{marker.data.uid}</h2>
              <form onSubmit={(event) => handleFormSubmit(event, marker.data.uid)}>
                {/* Form fields */}
                <button
                onClick={mimicClose}
                className = "closeOnSubmit"
                type="submit">Submit</button>
              </form>
            </div>
          </Popup>
            
          </Marker>
        ))}
      </MapContainer>

    </div>
  )
}

export default App
