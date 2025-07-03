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

// Main handler function
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Get the date from the path
    const path = event.path.replace('/.netlify/functions/api/', '');
    const date = path || event.queryStringParameters?.date;
    
    let parsedDate;
    
    // If no date parameter is provided, use current time
    if (!date || date === '') {
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
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ error: "Invalid Date" })
      };
    }
    
    // Return the formatted response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        unix: getUnixTimestamp(parsedDate),
        utc: formatUTCString(parsedDate)
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
}; 