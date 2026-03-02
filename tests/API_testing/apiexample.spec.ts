import { test, expect } from '@playwright/test';


//request is a fixture provided by Playwright for making HTTP requests in tests. It allows you to send HTTP requests and receive responses, which can be useful for API testing or for interacting with web services during your tests.
test('API Testing GET Example', async ({ request }) => {
  // Send a GET request to the API endpoint
  const response = await request.get('https://www.google.com/');

  // Assert that the response status is 200
  expect(response.status()).toBe(200);

    // Optionally, you can also check the response body or headers
    const responseBody = await response.text();

    // Assert that the response body contains expected content
    expect(responseBody).toContain('Google');

    // Assert that the response headers contain expected values
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/html'); 

    // Assert that the response code is 200
    expect(response.status()).toBe(200);    

});

    test('API Testing POST Example', async ({ request }) => {

    // Assert post request and check the response the payload consists of data in json format with title, body and userId
    // Send a POST request to the API endpoint with JSON payload
    const postResponse = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'foo',
            body: 'bar',
            userId: 1,
        },
    });
    expect(postResponse.status()).toBe(201); // Created
    
    // the response body should contain the same data as the request payload along with an id field
    //the expect is run on the postResponseBody which is the response body of the post request and it should match the object that we sent in the request payload
    const postResponseBody = await postResponse.json();
    expect(postResponseBody).toMatchObject({
        title: 'foo',
        body: 'bar',
        userId: 1,
    });

    // Assert that the response contains an id field
    expect(postResponseBody).toHaveProperty('id');
});
