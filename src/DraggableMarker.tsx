import { useMapEvents, Marker, Popup } from "react-leaflet";
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import NameForm from "./NameForm";
import axios from "axios";

function DraggableMarker(props:any) {
  const [markers, setMarkers] = useState([])
  const [newMarkers, setNewMarkers] = useState([])
  useEffect(() => {
    // Access the updated state here
    setMarkers(props.data)
  }, [markers]);
  console.log("markers qd le component et monté", markers)
  const center = {
    lat: 48,
    lng: -123.09,
  }
  const markerCustomSubType = "test";
  const markerType = "test";
  const rating = "test";
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      const marker = L.marker([lat, lng]).addTo(map);
      // Attach a click event handler to the Popup
      const popupContent = `
                     <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Enter name" />
          <button type="submit">Submit</button>
        </form>
             `
      marker.bindPopup(popupContent).on('click', (e) => {
        // Handle click event on Popup
        console.log('Popup clicked!');
      });
    }
  });
  const saveData = async () =>{
    await axios.post('http://localhost:3002/api/markers/', {
     newMarkers
    })
    .then((response) => {
      console.log("Markers saved successfully!");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) { 
          console.log(marker.getLatLng())
          setPosition(marker.getLatLng())
          const newMarker = 
             {
              "data": {
                "markerCustomSubType": "new",
                "markerType": "Fourmie",
                "rating": "new"
              },
              "lng": marker.getLatLng().lng,
              "lat": marker.getLatLng().lat,
              "uid": 14549340000009536
            }
          
          console.log("markers dans la fonction dragend", markers)
          setNewMarkers([...markers, newMarker]);
        }
      },
    }),
    [markers],
  )
    
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  useEffect(() => {
    if (newMarkers.length>0){
      saveData()
    }
   
  } , [newMarkers])

  console.log("newMarkers", newMarkers)
  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
        <NameForm
            saveMarker={saveData}
            position={position}
            data={""}
            uid={""}
            ></NameForm>
      </Popup>
    </Marker>
  );

}

export default DraggableMarker;