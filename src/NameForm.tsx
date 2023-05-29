import { useEffect, useState } from 'react';

function NameForm(props: any) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const marker = props.data
  console.log(marker)

  useEffect(() => {

    setName(name);
    setMessage(message)
  }, [name, message])


  const handleSubmit = (e) => {
    e.preventDefault();
    props.onClosePopup();


  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        "display": "flex","flexDirection": "column","padding": "1em"}}>
      <label>
        Name:
        <input
          type="text"
          defaultValue={marker.markerType}
          onChange={(e) => setName(e.target.value)}
          style = {{"display": "flex"}}
          
        />
      </label>

      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style = {{"display": "flex"}}
        ></textarea>
      </label>
      </div>

      <button type="submit"
      className="leaflet-popup-close-button"
      
      >Submit</button>
    </form>
  );
}

export default NameForm;
