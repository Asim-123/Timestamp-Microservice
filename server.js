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
    // Try to parse the date parameter
    // First, check if it's a Unix timestamp (number)
    const timestamp = parseInt(date);
    if (!isNaN(timestamp) && timestamp.toString() === date) {
      parsedDate = new Date(timestamp);
    } else {
      // Try parsing as a date string
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