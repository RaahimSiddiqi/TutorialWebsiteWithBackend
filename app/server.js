// server.js
const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();
app.use(cors())

const PORT = 3001;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../../blog/dist')));

// Define a login endpoint
app.post('/login', (req, res) => {
  // Your login logic goes here
  res.json({ status: 200, message: 'Login successful!' });
});

// For all other requests, send the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
