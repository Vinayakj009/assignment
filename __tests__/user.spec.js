// Import required libraries
const request = require("supertest");
const jwt = require("jsonwebtoken");

//Import the utility required for testing
const mongoUtility = require("./utility/mongo_util");

// Import the app required for testing.
const app = require("../API/app");

mongoUtility.setupDB("user_test_db");


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

const pagination_tests = [
  {
    pageSize: 1,
    currentPage: 1,
    expectedReturn: [{
      _id : expect.stringMatching(""),
      email:users[0].email
    }]
  },
  {
    pageSize: 1,
    currentPage: 2,
    expectedReturn: [{
      _id : expect.stringMatching(""),
      email:users[1].email
    }]
  },
  {
    pageSize: 2,
    currentPage: 1,
    expectedReturn: [{
      _id : expect.stringMatching(""),
      email:users[0].email
    },{
      _id : expect.stringMatching(""),
      email:users[1].email
    }]
  },
  {
    pageSize: 2,
    currentPage: 2,
    expectedReturn: []
  }
]


test("Create users required for next set of tests", async () => {
  for (let user of users) {
    const response = await request(app)
      .post("/user")
      .set('random_string', process.env.RANDOM_STRING)
      .send(user);
    expect(response.body).toEqual({
      message: "User created"
    });
    expect(response.statusCode).toBe(201);
  }
});

test("Test login error. Wrong email id or password", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: "wrong_email@test.com",
      password: "wrong_password"
    });
  expect(response.body).toEqual({
    message: "Wrong email id or password."
  });
  expect(response.statusCode).toBe(401);
});

for (let user of users) {
  test("Test login with success for user:" +user.email, async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: user.email,
        password: user.password
      });
    expect(response.body.message).toEqual("Authenticated");
    expect(response.statusCode).toBe(200);
    expect(response.body.expiresIn).toEqual(3600);
    if (response.statusCode == 200) {
      const index = users.indexOf(user);
      users[index].jwt = response.body.jwt;
    }
  });
}

test("Test authentication middleware for users/ get call with jwt unset", async () => {
  const response = await request(app)
    .get("/users")
  expect(response.body).toEqual({
    message: "Your session has expired"
  });
  expect(response.statusCode).toBe(401);
});

test("Test authentication middleware for users/ get call with bad jwt", async () => {
  const response = await request(app)
    .get("/users")
    .set("authorization", "Bad JWT");
  expect(response.body).toEqual({
    message: "Your session has expired"
  });
  expect(response.statusCode).toBe(401);
});

test("Test authentication middleware for users/ get call deleted user", async () => {
  const token = jwt.sign(
    { email: "deleted_user@test.com", userId: "random_user_id" },
    process.env.JWT_SECRET,
    { expiresIn: '1h' });
  const response = await request(app)
    .get("/users")
    .set("authorization", token);
  expect(response.body).toEqual({
    message: "Could not find the user. The user may have been deleted."
  });
  expect(response.statusCode).toBe(401);
});

function runPaginationTest(user, pageConfig) {
  test("Test getting users with success as " + user.email + " for pagesize:" + pageConfig.pageSize + " and currentPage:" +pageConfig.currentPage, async () => {
    const response = await request(app)
      .get("/users")
      .set("authorization", user.jwt)
      .query({pagesize:pageConfig.pageSize, currentpage:pageConfig.currentPage});
    expect(response.body).toEqual({
      message: "Users fetched successfully",
      totalUsers: users.length,
      users: pageConfig.expectedReturn
    });
    expect(response.statusCode).toBe(200);
  });
}

for (let user of users) {
  for (let pageConfig of pagination_tests) {
    runPaginationTest(user, pageConfig);
  }
}
