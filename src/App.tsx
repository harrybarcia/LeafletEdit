
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import NameForm from './NameForm'
import React, { useState, useEffect } from "react";
import DraggableMarker from './DraggableMarker'
import ExampleComponent from './MyComponent'

function App() {
  const [markers, setMarkers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMarkers, setFilteredMarkers] = useState<any[]>([]);

  const mimicClose = () => {
    const popupclose = document.querySelector('.leaflet-popup-close-button')
    const closeOnSubmit = document.querySelector('.closeOnSubmit')
    closeOnSubmit && popupclose?.dispatchEvent(new Event('click'))
    fetchData();
    setSearchTerm('');
  };

  useEffect(() => {

    if (searchTerm.length > 0 ){
      const markersFiltered = markers.filter((marker)=>marker.data.markerType.startsWith(searchTerm.trim()))
      console.log(markersFiltered) // renvoi un tableau vide quand je rééffectue une recherche
      setFilteredMarkers(markersFiltered);
    } else {
      setFilteredMarkers(markers);
    }
  }, [searchTerm])
  console.log(searchTerm)

  useEffect(() => {
    fetchData()
  }, [])

  const resetMarkers = () => {
    setFilteredMarkers(markers);
    setSearchTerm('');
  }
  const handleSearch = (event:any) => {
    setSearchTerm(event.target.value);
  };
  const fetchData = () => {
    axios("http://localhost:3002/api/markers").then((response) => {
      setMarkers(response.data);
      setFilteredMarkers(response.data);

    });
  }

  return(
    <div style={{ width: '100%', height: '70vh' }}>
      <MapContainer center={[45, -123]} zoom={5} style={{ width: '100%', height: '100%' }} 
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        />

        { filteredMarkers.map((marker, index) => (
          <Marker
          key={index}
          position={[marker.lat, marker.lng]}>
           <Popup>
            <NameForm
            position={[marker.lat, marker.lng]}
            onClosePopup={mimicClose}
            data={marker.data}
            uid={marker.uid}
            ></NameForm>
          </Popup>
            
          </Marker>
        ))}
        <DraggableMarker></DraggableMarker>
     
      </MapContainer>
      <div>
        <button
        >
          Filter
        </button>
        
        <button
        onClick={resetMarkers}  
        >
          Reset
        </button>

      </div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ExampleComponent></ExampleComponent>

    </div>
  )
}

export default App
