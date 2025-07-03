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
    // The path will be like "/.netlify/functions/api/1451001600000" or "/.netlify/functions/api/"
    let date = '';
    if (event.path.includes('/.netlify/functions/api/')) {
      date = event.path.replace('/.netlify/functions/api/', '');
    }
    
    // If no date in path, check query parameters
    if (!date && event.queryStringParameters?.date) {
      date = event.queryStringParameters.date;
    }
    
    let parsedDate;
    
    // If no date parameter is provided, use current time
    if (!date || date === '' || date === '/') {
      parsedDate = new Date();
    } else {
      // Try to parse the date parameter
      // First, check if it's a Unix timestamp (number)
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