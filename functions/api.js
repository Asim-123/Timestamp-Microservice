// Helper function to check if a date is valid
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
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
    // Extract date parameter from the path
    const pathSegments = event.path.split('/');
    let dateParam = pathSegments[pathSegments.length - 1];
    
    // Remove any trailing slash or empty segments
    dateParam = dateParam.replace(/\/$/, '');
    
    let parsedDate;
    
    // If no date parameter is provided or it's empty, use current time
    if (!dateParam || dateParam === '' || dateParam === 'api') {
      parsedDate = new Date();
    } else {
      // If the date string consists only of digits, treat it as Unix timestamp
      if (/^\d+$/.test(dateParam)) {
        parsedDate = new Date(parseInt(dateParam));
      } else {
        // Handle any URI encoding in the date string
        const decodedDate = decodeURIComponent(dateParam);
        parsedDate = new Date(decodedDate);
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
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
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
