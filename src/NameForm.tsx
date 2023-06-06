import { useEffect, useState } from 'react';
import axios from 'axios';

function NameForm(props: any) {
const [markerCustomSubType, setMarkerCustomSubType] = useState(props.data.markerCustomSubType)
const [markerType, setMarkerType] = useState(props.data.markerType)
const [rating, setRating] = useState(props.data.rating)
const [lng, setLng] = useState([props.position][0][1])
const [lat, setLat] = useState([props.position][0][0])

  const marker = props.data
  console.log(marker)
  const updateMarker = async () => {
    const res = await axios.post(`http://localhost:3002/api/markers/${marker.uid}`, {
      data:{markerCustomSubType,
      markerType,
      rating},
      lat,
      lng,
      uid:marker.uid
    })
    return res

  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    props.onClosePopup();
    updateMarker();


  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        "display": "flex","flexDirection": "column","padding": "1em"}}>
      <label>
        Type:
        <input
          type="text"
          defaultValue={marker.markerType}
          onChange={(e) => setMarkerType(e.target.value)}
          style = {{"display": "flex"}}
          
        />
      </label>
      <label>
        markerCustomSubType:
        <input
          type="text"
          defaultValue={marker.markerCustomSubType}
          onChange={(e) => setMarkerCustomSubType(e.target.value)}
          style = {{"display": "flex"}}
          
        />
      </label>
      
      <label>
        rating:
        <input
          type="text"
          defaultValue={marker.rating}
          onChange={(e) => setRating(e.target.value)}
          style = {{"display": "flex"}}
          
        />
      </label>

      </div>

      <button type="submit"
      className="closeOnSubmit"
      
      >Submit</button>
    </form>
  );
}

export default NameForm;
