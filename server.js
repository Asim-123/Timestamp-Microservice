const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Helper function to check if a date is valid
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

// Helper function to format UTC string
function formatUTCString(date) {
  return date.toUTCString();
}

// Helper function to get Unix timestamp in milliseconds
function getUnixTimestamp(date) {
  return date.getTime();
}

// API endpoint for timestamp conversion
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  
  let parsedDate;
  
  // If no date parameter is provided, use current time
  if (!date) {
    parsedDate = new Date();
  } else {
    // Only treat as timestamp if it's a pure number and looks like a timestamp
    if (/^\d+$/.test(date) && date.length >= 10) {
      const timestamp = parseInt(date);
      parsedDate = new Date(timestamp);
    } else {
      parsedDate = new Date(date);
    }
  }
  
  // Check if the parsed date is valid
  if (!isValidDate(parsedDate)) {
    return res.json({ error: "Invalid Date" });
  }
  
  // Return the formatted response
  res.json({
    unix: getUnixTimestamp(parsedDate),
    utc: formatUTCString(parsedDate)
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 