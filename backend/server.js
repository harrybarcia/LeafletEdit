const express = require('express');
const app = express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
const axios = require('axios');

const fs = require('fs');
const { existsSync, readFile, writeFile } = require('fs');
const http = require('http');
const { resolve } = require('path');
const url = require('url');
const API_BASE = '/api/marker';
const ROOT_PATH = resolve(__dirname, './');
const PUBLIC_PATH = `${ROOT_PATH}/public`;
const DEFAULT_MARKERS_PATH = `${PUBLIC_PATH}/markers.default.json`;
const USER_MARKERS_PATH = `${PUBLIC_PATH}/markers.json`;
console.log("user", USER_MARKERS_PATH);
let defaultMarkers;

const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// Define your API endpoint for fetching users
app.get('/api/users', (req, res) => {
  // Perform any necessary database queries or logic
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];
  
  res.json(users); // Send the response as JSON
});


const loadMarkers = (filePath) => new Promise((resolve, reject) => {
  const promises = [];
  
  if (existsSync(filePath)) {
    readFile(filePath, (err, markers) => {
      if (err) reject(err);
      else resolve(JSON.parse(markers));
    });
  }
  else resolve([]);
});

app.get('/api/markers', (req, res) => {
  console.log("get");
  loadMarkers(USER_MARKERS_PATH)
    .then((markers) => {
      res.json(markers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error loading markers');
    });
});

app.post('/api/markers/:id', (req, res) => {
  console.log("put");

  const newData = req.body
  console.log(newData)

  const markerId = parseInt(req.params.id);
  newData.uid = markerId
  const data = JSON.parse(fs.readFileSync(USER_MARKERS_PATH, 'utf8'));
  for (let i = 0; i < data.length; i++) {
    const markerUid = data[i].uid;
    if (markerUid === markerId) {
      console.log("for", i, markerUid === markerId )
      data[i] = newData
      break;
    }
  }
  fs.writeFileSync(USER_MARKERS_PATH, JSON.stringify(data, null, 2));
  res.status(200).json({ message: 'Store updated!', data });
});





// Start the server
const port = 3002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
