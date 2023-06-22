import { useMapEvents, Marker, Popup } from "react-leaflet";
import { useState, useMemo, useRef, useCallback } from "react";
import NameForm from "./NameForm";
import axios from "axios";

function DraggableMarker() {

  const center = {
    lat: 48,
    lng: -123.09,
  }
  const markerCustomSubType = "test";
  const markerType = "test";
  const rating = "test"

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
  const createMarker = async (marker:object) => {
    try {
      await axios.post('http://localhost:3002/api/markers/', {
        data: {
          markerCustomSubType,
          markerType,
          rating
        },
        lng: position.lng,
        lat: position.lat,
        uid:'1'
      })
    } catch{
      ((err:object) => {console.log(err)})
    }
  };
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

          createMarker(marker);
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])
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
            position={position}
            data={""}
            uid={""}
            ></NameForm>
      </Popup>
    </Marker>
  );

}

export default DraggableMarker;