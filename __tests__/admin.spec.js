// Import required libraries
const request = require("supertest");

//Import the utility required for testing
const mongoUtility = require("./utility/mongo_util");

// Import the app required for testing.
const app = require("../API/app");

mongoUtility.setupDB("admin_test_db");

test("Test header token for create user route", async () => {
  const app_request = request(app);
  const response = await app_request.post("/user");
  expect(response.body).toEqual({ message: "You are not allowed to do this." });
  expect(response.statusCode).toBe(401);
});

test("Test header token for delete user route", async () => {
  const response = await request(app).delete("/user");
  expect(response.body).toEqual({ message: "You are not allowed to do this." });
  expect(response.statusCode).toBe(401);
});

test("Test create user, check whether email id and password has been supplied or not ", async () => {
  const response = await request(app)
    .post("/user")
    .set('random_string', process.env.RANDOM_STRING);
  expect(response.body).toEqual({
    message: "You did not supply valid email id or password"
  });
  expect(response.statusCode).toBe(401);
});

const users = [
  {
    email: "test1@test.com",
    password: "test1password"
  },
  {
    email: "test2@test.com",
    password: "test2password"
  }
]

for (let user of users) {
  test("Test create user for " + user.email + ", success route ", async () => {
    const response = await request(app)
      .post("/user")
      .set('random_string', process.env.RANDOM_STRING)
      .send(user);
    expect(response.body).toEqual({
      message: "User created"
    });
    expect(response.statusCode).toBe(201);
  });
}

for (let user of users) {
  test("Test create user for " + user.email + ", email already exists response ", async () => {
    const response = await request(app)
      .post("/user")
      .set('random_string', process.env.RANDOM_STRING)
      .send(user);
    expect(response.body).toEqual({
      message: "The email id has already been used"
    });
    expect(response.statusCode).toBe(500);
  });
}

for (let user of users) {
  test("Test delete user for " + user.email + ", success response ", async () => {
    const response = await request(app)
      .delete("/user")
      .set('random_string', process.env.RANDOM_STRING)
      .query({ email: user.email });
    expect(response.body).toEqual({
      message: "User deleted"
    });
    expect(response.statusCode).toBe(202);
  });
}

for (let user of users) {
  test("Test delete user for " + user.email + ", email does not exists response ", async () => {
    const response = await request(app)
      .delete("/user")
      .set('random_string', process.env.RANDOM_STRING)
      .query({ email: user.email });
    expect(response.body).toEqual({
      message: "The email id does not exist"
    });
    expect(response.statusCode).toBe(500);
  });
}
