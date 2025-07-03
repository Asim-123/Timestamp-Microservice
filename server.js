const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

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
    // If the date string consists only of digits, treat it as a Unix timestamp
    if (/^\d+$/.test(date)) {
      // Parse the string to an integer and create a new Date object
      parsedDate = new Date(parseInt(date));
    } else {
      // Otherwise, parse it as a date string
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