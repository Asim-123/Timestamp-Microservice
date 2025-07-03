# Timestamp Microservice

A full-stack JavaScript application that converts dates to Unix timestamps and UTC strings. Built for the FreeCodeCamp API and Microservices Certification.

## Features

- Convert date strings to Unix timestamps (milliseconds)
- Convert date strings to UTC format strings
- Handle Unix timestamps as input
- Return current time when no date is provided
- Modern, responsive UI
- RESTful API design
- Error handling for invalid dates

## API Endpoints

### GET /api/:date?

Converts a date to Unix timestamp and UTC string.

**Parameters:**
- `date` (optional): A valid date string or Unix timestamp

**Response Format:**
```json
{
  "unix": 1451001600000,
  "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
}
```

**Error Response:**
```json
{
  "error": "Invalid Date"
}
```

**Examples:**
- `/api/2015-12-25` → `{"unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT"}`
- `/api/1451001600000` → `{"unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT"}`
- `/api/` → Current time in both formats

## Local Development

### Prerequisites
- Node.js (version 14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd timestamp-microservice
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run build` - Build command (no build step required for this project)

## Deployment to Netlify

This project is configured for deployment to Netlify using serverless functions.

### Automatic Deployment

1. Push your code to a GitHub repository
2. Connect your repository to Netlify
3. Netlify will automatically detect the configuration and deploy

### Manual Deployment

1. Install the Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
netlify deploy --prod
```

### Environment Variables

No environment variables are required for this project.

## Project Structure

```
timestamp-microservice/
├── public/                 # Static files
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   └── script.js          # Frontend JavaScript
├── functions/             # Netlify serverless functions
│   └── api.js            # API endpoint function
├── server.js              # Express server (for local development)
├── package.json           # Dependencies and scripts
├── netlify.toml          # Netlify configuration
└── README.md             # Project documentation
```

## Testing the API

You can test the API using curl or any HTTP client:

```bash
# Test with a date string
curl https://your-app.netlify.app/api/2015-12-25

# Test with a Unix timestamp
curl https://your-app.netlify.app/api/1451001600000

# Test current time
curl https://your-app.netlify.app/api/
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Deployment**: Netlify (serverless functions)
- **Styling**: Custom CSS with responsive design

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

This is a FreeCodeCamp project, but feel free to fork and improve it! 