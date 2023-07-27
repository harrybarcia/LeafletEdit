import { useEffect, useState } from 'react';
import axios from 'axios';

function NameForm(props: any) {

  const { position, data, uid } = props
  console.log(position)
  const [markerCustomSubType, setMarkerCustomSubType] = useState(data.markerCustomSubType?data.markerCustomSubType:"test")
  const [markerType, setMarkerType] = useState(data.markerType)
  const [rating, setRating] = useState(data.rating)
  const [editMode, setEditMode] = useState(false);

  
  const handleSubmit = async (e: any) => {
    const updateMarker = async () => {
      try {
        await axios.post(`http://localhost:3002/api/markers/${uid}`, {
          data: {
            markerCustomSubType,
            markerType,
            rating
          },
          lng: position[1],
          lat: position[0],
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
  const handleEditClick = (e:any) => {
    e.stopPropagation();
    setEditMode(true);

  };

  return (
    <>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '1em' }}>
            <label>
              Type:
              <input
                type="text"
                value={markerType}
                onChange={(e) => setMarkerType(e.target.value)}
                style={{ display: 'flex' }}
              />
            </label>
            <label>
              markerCustomSubType:
              <input
                type="text"
                value={markerCustomSubType}
                onChange={(e) => setMarkerCustomSubType(e.target.value)}
                style={{ display: 'flex' }}
              />
            </label>
            <label>
              rating:
              <input
                type="text"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ display: 'flex' }}
              />
            </label>
          </div>
          <button type="submit" className="closeOnSubmit">
            Submit
          </button>
        </form>
      ) : (
        <div>
          <div>Type: {markerType}</div>
          <div>markerCustomSubType: {markerCustomSubType}</div>
          <div>rating: {rating}</div>
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
      <button type="submit" className="closeOnSubmit" onClick={props.saveMarker}>
        Submit the new Marker
      </button>
    </>
  );
}

export default NameForm;
