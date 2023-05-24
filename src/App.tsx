
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'


function App() {

  async function fetchData() {
  try {
    axios("http://localhost:3002/api/users").then((response) => {
      console.log(response.data);
    });
  } catch (error) {
    // Handle any network or request errors
    console.error('Error:', error.message);
  }
}

fetchData();

async function loadMarkers() {
  try {
    axios("http://localhost:3002/api/markers").then((response) => {
      console.log(response.data);
    });
  } catch (error) {
    // Handle any network or request errors
    console.error('Error:', error.message);
  }
}
loadMarkers();

  return(
    <div style={{ width: '100%', height: '100vh' }}>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: '100%', height: '100%' }} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
      

    


  )
}

export default App
