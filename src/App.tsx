
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import { useEffect, useState } from 'react'


function App() {
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    axios("http://localhost:3002/api/users").then((response) => {

      console.log(response.data);
    });
  }, []);



  useEffect(() => {
    axios("http://localhost:3002/api/markers").then((response) => {
      setMarkers(response.data);
      console.log(response.data);
    
    });

  }
  , []);


  return(
    <div style={{ width: '100%', height: '100vh' }}>
      <MapContainer center={[45, -123]} zoom={5} style={{ width: '100%', height: '100%' }} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker position={[marker.lat, marker.lng]}>
            <Popup>
              {marker.data.markerType}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
      

    


  )
}

export default App
