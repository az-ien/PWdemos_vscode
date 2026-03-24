// same folder so single dot
import { test, expect } from './students.fixture';  




// This hook runs once BEFORE any tests in this file.
// It checks that the JSON Server endpoint is running and returns 200 ok.
test.beforeAll(async ({ request }) => {

  // Call the students endpoint to make sure json-server is started
  const healthResponse = await request.get('http://localhost:3000/students');

  // If json-server is not running or returns an error, this assertion fails early
  expect(healthResponse.status()).toBe(200);
  console.log('json-server is running, response 200 OK');
});

// Actual test
test('GET students', async ({ request, student }) => {

  // GET a student by id from the API
  const getResp = await request.get(
    `http://localhost:3000/students/`
  );

  // Expect successful GET
  expect(getResp.status()).toBe(200);

  const data = await getResp.json();
  console.log('The data from the JSON is:', data);

});