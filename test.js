// Test the date parsing logic
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function formatUTCString(date) {
  return date.toUTCString();
}

function getUnixTimestamp(date) {
  return date.getTime();
}

// Test cases
const testCases = [
  '1451001600000',
  '2015-12-25',
  '',
  'invalid-date'
];

console.log('Testing date parsing logic:');
console.log('==========================');

testCases.forEach(testCase => {
  console.log(`\nInput: "${testCase}"`);
  
  let parsedDate;
  
  if (!testCase || testCase === '' || testCase === '/') {
    parsedDate = new Date();
    console.log('Using current time');
  } else {
    // If the date string consists only of digits, treat it as a Unix timestamp
    if (/^\d+$/.test(testCase)) {
      // Parse the string to an integer and create a new Date object
      parsedDate = new Date(parseInt(testCase));
      console.log('Parsed as timestamp');
    } else {
      // Otherwise, parse it as a date string
      parsedDate = new Date(testCase);
      console.log('Parsed as date string');
    }
  }
  
  if (!isValidDate(parsedDate)) {
    console.log('Result: { error: "Invalid Date" }');
  } else {
    console.log(`Result: { unix: ${getUnixTimestamp(parsedDate)}, utc: "${formatUTCString(parsedDate)}" }`);
  }
}); 