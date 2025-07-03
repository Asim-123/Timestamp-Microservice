const express = require('express');
const serverless = require('serverless-http');

const app = express();

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
app.get('/:date?', (req, res) => {
  const { date } = req.params;
  
  let parsedDate;
  
  // If no date parameter is provided, use current time
  if (!date) {
    parsedDate = new Date();
  } else {
    // Try to parse the date parameter
    // First, check if it's a Unix timestamp (number)
    const timestamp = parseInt(date);
    if (!isNaN(timestamp)) {
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

// Export the serverless function
module.exports.handler = serverless(app); 