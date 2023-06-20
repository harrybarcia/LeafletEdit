import React, { useEffect } from 'react';
import WebSocket from 'ws';

const WebSocketComponent: React.FC = () => {
  useEffect(() => {
    const socket = new WebSocket('wss://stream.aisstream.io/v0/stream');

    socket.onopen = function () {
      let subscriptionMessage = {
        Apikey: '7a00c4c1f8b68f7622ff2cbf95c7940f6f536d13',
        BoundingBoxes: [[[-180, -90], [180, 90]]],
      };
      socket.send(JSON.stringify(subscriptionMessage));
    };

    socket.onmessage = function (event) {
      let aisMessage = JSON.parse(event.data);
      if (aisMessage['MessageType'] === 'PositionReport') {
        let positionReport = aisMessage['Message']['PositionReport'];
        console.log(
          `ShipId: ${positionReport['UserID']} Latitude: ${positionReport['Latitude']} Longitude: ${positionReport['Longitude']}`
        );
      }
    };

    return () => {
      socket.close(); // Close the WebSocket connection when the component unmounts
    };
  }, []);

  return (
    <div>
      <h1>My React App</h1>
      <WebSocketComponent />
    </div>
  );
};

export default WebSocketComponent;
