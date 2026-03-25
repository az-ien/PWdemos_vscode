// same folder so single dot
//the students.json (contains the data) -> fixture gets the json -> test gets the fixture
//as this test is using custom created API so that is being run from playwright config so if anyother api is needed change the endpoints
//


import { test, expect } from './students.fixture';  

let chainParameter: any;  // declare a mutable variable, becuase const variables cannot be assigned later on they have to be assigned there and then 

// This hook runs once BEFORE any tests in this file.
// It checks that the JSON Server endpoint is running and returns 200 ok.
test.beforeAll(async ({ request }) => {

  // Call the students endpoint to make sure json-server is started
  const healthResponse = await request.get('http://localhost:3000/students');

  // If json-server is not running or returns an error, this assertion fails early
  expect(healthResponse.status()).toBe(200);
  console.log('json-server is running, response 200 OK');
});


// create a new student and post it to the  students.json file and check the response code 
test('create a student', async ({request}) => {
  const responseForPost = await request.post(`http://localhost:3000/students/`, {data:{ id: '654', name: 'Jambalaya', location: 'jambalaya home', phone: '999888777', courses: ['hee hee','ha ha'] }});
  
  //Expect response code to be created and ok 
  expect(responseForPost.status()).toBe(201);
  
  //the created new student is 
  const jsonResponse = await responseForPost.json()

  if(jsonResponse.id == '654')
  {
    console.log('the created student is:', jsonResponse)
  }


  //create a parameter, store the id in that parameter for request chaining and pass that parameter to all other requests
   chainParameter = jsonResponse.id



});



// test just to get all of the records from students.json
test('GET students', async ({ request, student }) => {

  // GET a student by id from the API
  const getResp = await request.get(`http://localhost:3000/students/`);

  // Expect successful repsonse GET
  expect(getResp.status()).toBe(200);

  const data = await getResp.json();
  console.log('The data from the JSON is:', data);

});


// now update a specific student with a specific ID 
test('update  only the jambalaya student with specific ID and only one feild in the whole json', async ({request}) =>{
  const responseFromUpdate = await request.patch(`http://localhost:3000/students/${chainParameter}`,{data:{location:'location updated'}})

  // Expect successful repsonse
  expect(responseFromUpdate.status()).toBe(200)

  //get the json to individually interact with the fields
  const jsoncheck = await responseFromUpdate.json()
  expect(jsoncheck.location).toContain('updated')

  if(jsoncheck.id == chainParameter)
  {
    console.log('the updated data is:', jsoncheck)
  }

});


//now delete all of the newly created records and those that were updated
test('delete only the newly created all records with the consistant id', async ({request}) => {
  const responseFromDelete = await request.delete(`http://localhost:3000/students/${chainParameter}`)
  
  // Expect successful repsonse
  expect(responseFromDelete.status()).toBe(200)
  
  //assert that the id is no more in the json file 
  const jsonOfResponse =  await responseFromDelete.json()
  expect(jsonOfResponse.id).toBe(chainParameter)
  console.log('the created and updated record was deleted:', jsonOfResponse.id)
});

