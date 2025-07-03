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

// Test cases for different scenarios
const testCases = [
  // Valid Unix timestamp
  { input: '1451001600000', expected: { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" } },
  
  // Valid date string
  { input: '2015-12-25', expected: { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" } },
  
  // Empty date (should return current time)
  { input: '', expected: 'current_time' },
  
  // Invalid date
  { input: 'invalid-date', expected: { error: "Invalid Date" } },
  
  // Another valid date
  { input: '2023-01-01', expected: { unix: 1672531200000, utc: "Sun, 01 Jan 2023 00:00:00 GMT" } },
  
  // Unix timestamp as string
  { input: '1672531200000', expected: { unix: 1672531200000, utc: "Sun, 01 Jan 2023 00:00:00 GMT" } },
  
  // Invalid format
  { input: 'not-a-date', expected: { error: "Invalid Date" } },
  
  // Edge case - just digits but invalid
  { input: '999999999999999999', expected: { error: "Invalid Date" } }
];

console.log('Testing date parsing logic:');
console.log('==========================');

let passedTests = 0;
let totalTests = 0;

testCases.forEach((testCase, index) => {
  console.log(`\nTest ${index + 1}: Input "${testCase.input}"`);
  
  let parsedDate;
  
  if (!testCase.input || testCase.input === '' || testCase.input === '/') {
    parsedDate = new Date();
    console.log('Using current time');
  } else {
    // If the date string consists only of digits, treat it as a Unix timestamp
    if (/^\d+$/.test(testCase.input)) {
      // Parse the string to an integer and create a new Date object
      parsedDate = new Date(parseInt(testCase.input));
      console.log('Parsed as timestamp');
    } else {
      // Otherwise, parse it as a date string
      parsedDate = new Date(testCase.input);
      console.log('Parsed as date string');
    }
  }
  
  let result;
  if (!isValidDate(parsedDate)) {
    result = { error: "Invalid Date" };
    console.log('Result: { error: "Invalid Date" }');
  } else {
    result = {
      unix: getUnixTimestamp(parsedDate),
      utc: formatUTCString(parsedDate)
    };
    console.log(`Result: { unix: ${result.unix}, utc: "${result.utc}" }`);
  }
  
  // Test validation
  totalTests++;
  let testPassed = false;
  
  if (testCase.expected === 'current_time') {
    // For current time, just check that it's a valid response structure
    testPassed = result.unix && result.utc && typeof result.unix === 'number';
    console.log(`Expected: Current time structure`);
  } else {
    // For specific expected values
    if (testCase.expected.error) {
      testPassed = result.error === testCase.expected.error;
    } else {
      testPassed = result.unix === testCase.expected.unix && result.utc === testCase.expected.utc;
    }
    console.log(`Expected: ${JSON.stringify(testCase.expected)}`);
  }
  
  if (testPassed) {
    console.log('✅ PASSED');
    passedTests++;
  } else {
    console.log('❌ FAILED');
  }
});

console.log('\n==========================');
console.log(`Test Results: ${passedTests}/${totalTests} tests passed`);

// Additional specific tests for the requirements
console.log('\n\nSpecific Requirement Tests:');
console.log('==========================');

// Test 1: Valid date should return unix as Number
const testDate1 = new Date('2015-12-25');
const result1 = { unix: testDate1.getTime(), utc: testDate1.toUTCString() };
console.log(`Test 1 - Unix as Number: ${typeof result1.unix === 'number' ? '✅ PASSED' : '❌ FAILED'}`);

// Test 2: Valid date should return utc in correct format
const testDate2 = new Date('2015-12-25');
const result2 = { unix: testDate2.getTime(), utc: testDate2.toUTCString() };
const expectedUTC = "Fri, 25 Dec 2015 00:00:00 GMT";
console.log(`Test 2 - UTC format: ${result2.utc === expectedUTC ? '✅ PASSED' : '❌ FAILED'}`);

// Test 3: Specific timestamp test
const timestamp1451001600000 = new Date(1451001600000);
const result3 = { unix: timestamp1451001600000.getTime(), utc: timestamp1451001600000.toUTCString() };
const expected3 = { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" };
console.log(`Test 3 - Timestamp 1451001600000: ${JSON.stringify(result3) === JSON.stringify(expected3) ? '✅ PASSED' : '❌ FAILED'}`);

// Test 4: Invalid date handling
const invalidDate = new Date('invalid-date');
const result4 = !isValidDate(invalidDate) ? { error: "Invalid Date" } : { unix: invalidDate.getTime(), utc: invalidDate.toUTCString() };
console.log(`Test 4 - Invalid date: ${result4.error === "Invalid Date" ? '✅ PASSED' : '❌ FAILED'}`);

// Test 5: Empty date parameter (current time)
const currentTime = new Date();
const result5 = { unix: currentTime.getTime(), utc: currentTime.toUTCString() };
console.log(`Test 5 - Empty date (current time): ${result5.unix && result5.utc ? '✅ PASSED' : '❌ FAILED'}`);

// Test 6: Date string parsing
const dateString = '2023-01-01';
const parsedDateString = new Date(dateString);
const result6 = isValidDate(parsedDateString) ? { unix: parsedDateString.getTime(), utc: parsedDateString.toUTCString() } : { error: "Invalid Date" };
console.log(`Test 6 - Date string parsing: ${result6.unix ? '✅ PASSED' : '❌ FAILED'}`);

// API Endpoint Tests
console.log('\n\nAPI Endpoint Tests:');
console.log('==================');

// Simulate API responses
function simulateAPIResponse(dateParam) {
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
    return { error: "Invalid Date" };
  } else {
    return {
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    };
  }
}

// Test 2: Valid date should return unix as Number
const apiTest1 = simulateAPIResponse('2015-12-25');
console.log(`API Test 2 - Unix as Number: ${typeof apiTest1.unix === 'number' ? '✅ PASSED' : '❌ FAILED'}`);

// Test 3: Valid date should return utc in correct format
const apiTest2 = simulateAPIResponse('2015-12-25');
const expectedUTCFormat = "Fri, 25 Dec 2015 00:00:00 GMT";
console.log(`API Test 3 - UTC format: ${apiTest2.utc === expectedUTCFormat ? '✅ PASSED' : '❌ FAILED'}`);

// Test 4: Specific timestamp test
const apiTest3 = simulateAPIResponse('1451001600000');
const expectedTimestamp = { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" };
console.log(`API Test 4 - Timestamp 1451001600000: ${JSON.stringify(apiTest3) === JSON.stringify(expectedTimestamp) ? '✅ PASSED' : '❌ FAILED'}`);

// Test 5: Date string parsing
const apiTest4 = simulateAPIResponse('2023-01-01');
console.log(`API Test 5 - Date string parsing: ${apiTest4.unix ? '✅ PASSED' : '❌ FAILED'}`);

// Test 6: Invalid date handling
const apiTest5 = simulateAPIResponse('invalid-date');
console.log(`API Test 6 - Invalid date: ${apiTest5.error === "Invalid Date" ? '✅ PASSED' : '❌ FAILED'}`);

// Test 7 & 8: Empty date parameter (current time)
const apiTest6 = simulateAPIResponse('');
console.log(`API Test 7 - Empty date (unix): ${apiTest6.unix ? '✅ PASSED' : '❌ FAILED'}`);
console.log(`API Test 8 - Empty date (utc): ${apiTest6.utc ? '✅ PASSED' : '❌ FAILED'}`); 