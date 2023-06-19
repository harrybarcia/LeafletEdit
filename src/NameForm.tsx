import { useEffect, useState } from 'react';
import axios from 'axios';

function NameForm(props: any) {
  const {position, data, uid} = props
  const [markerCustomSubType, setMarkerCustomSubType] = useState(data.markerCustomSubType)
  const [markerType, setMarkerType] = useState(data.markerType)
  const [rating, setRating] = useState(data.rating)

  console.log("data", data)
  const handleSubmit = async (e: any) => {
    const updateMarker = async () => {
      try {
        await axios.post(`http://localhost:3002/api/markers/${uid}`, {
        data:{markerCustomSubType,
        markerType,
        rating},
        lng:position[1],
        lat:position[0],
        uid
        })
      } catch (error) {
        console.error("Error:", error);
      }
    };
    updateMarker()

    e.preventDefault();
    props.onClosePopup();
  }
    

  

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        "display": "flex","flexDirection": "column","padding": "1em"}}>
      <label>
        Type:
        <input
          type="text"
          defaultValue={data.markerType}
          onChange={(e) => setMarkerType(e.target.value)}
          style = {{"display": "flex"}}
          
        />
      </label>
      <label>
        markerCustomSubType:
        <input
          type="text"
          defaultValue={data.markerCustomSubType}
          onChange={(e) => setMarkerCustomSubType(e.target.value)}
          style = {{"display": "flex"}}
          
        />
      </label>
      
      <label>
        rating:
        <input
          type="text"
          defaultValue={data.rating}
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
