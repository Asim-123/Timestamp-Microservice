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
    let dateParam = '';
    const path = event.path || '';
    
    // Extract date from path for Netlify function structure
    if (path.includes('/.netlify/functions/api/')) {
      dateParam = path.split('/.netlify/functions/api/')[1];
    } 
    // Extract date for direct /api/ path access
    else if (path.startsWith('/api/')) {
      dateParam = path.split('/api/')[1];
    }
    
    // If no date in path, check query parameters
    if (!dateParam && event.queryStringParameters?.date) {
      dateParam = event.queryStringParameters.date;
    }
    
    let parsedDate;
    
    // If no date parameter is provided, use current time
    if (!dateParam) {
      parsedDate = new Date();
    } else {
      // Remove any trailing slash
      dateParam = dateParam.replace(/\/$/, '');
      
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

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  
  let parsedDate;
  
  if (!dateParam || dateParam === '' || dateParam === '/') {
    parsedDate = new Date();
  } else {
    if (/^\d+$/.test(dateParam)) {
      parsedDate = new Date(parseInt(dateParam));
    } else {
      parsedDate = new Date(dateParam);
    }
  }
  
  if (!isValidDate(parsedDate)) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    });
  }
}); 