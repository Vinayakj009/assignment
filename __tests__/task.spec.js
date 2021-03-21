// Import required libraries
const request = require("supertest");
const jwt = require("jsonwebtoken");

//Import the utility required for testing
const mongoUtility = require("./utility/mongo_util");

// Import the app required for testing.
const app = require("../API/app");
const user = require("../API/models/user");

mongoUtility.setupDB("task_test_db");


const users = [
  {
    email: "test1@test.com",
    password: "test1password",
    tasks: [
      {
        title: "This is the title of task 1 for user 1",
        description: "This is the description of task 1 for user 1"
      }, {
        title: "This is the title of task 2 for user 1",
        description: "This is the description of task 2 for user 1"
      }
    ]
  },
  {
    email: "test2@test.com",
    password: "test2password",
    tasks: [
      {
        title: "This is the title of task 1 for user 2",
        description: "This is the description of task 1 for user 2"
      }
    ]
  }
]

test("Create users for next set of tests, and also populate their jwt token, and userid", async () => {
  for (let user of users) {
    let response = await request(app)
      .post("/user")
      .set('random_string', process.env.RANDOM_STRING)
      .send(user);
    expect(response.body).toEqual({
      message: "User created"
    });
    expect(response.statusCode).toBe(201);
    response = await request(app)
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
      users[index].userId = response.body.userId;
    }
  }
});

// The full test for the authentication middleware is done in user's test.
// Here we are just testing whether the routes have the authentication middleware.
test("Test authentication middleware for create task call with jwt unset", async () => {
  const response_post = await request(app)
    .post("/task")
  expect(response_post.body).toEqual({
    message: "Your session has expired"
  });
  expect(response_post.statusCode).toBe(401);
  const response_get = await request(app)
    .get("/task")
  expect(response_get.body).toEqual({
    message: "Your session has expired"
  });
  expect(response_get.statusCode).toBe(401);
});

function createTask(user, task){
  const task_index = user.tasks.indexOf(task);
  test("Test creation of tasks for user " + user.email + " task index " + task_index, async () => {
    const response = await request(app)
      .post("/task")
      .set("authorization", user.jwt)
      .send(task);
    expect(response.body).toEqual({
      message: "Task successfully added",
      id: expect.stringMatching("")
    });
    expect(response.statusCode).toBe(201);
    user.tasks[task_index].user_id = user.userId;
    user.tasks[task_index]._id = response.body.id;
  });
}

for (let user of users) {
  for (let task of user.tasks) {
    createTask(user, task);
  }
}



const pagination_tests = [
  {
    pageSize: 1,
    currentPage: 1,
    expectedReturns: [
      [
        users[0].tasks[0]
      ], [
        users[1].tasks[0]
      ]
    ]
  },
  {
    pageSize: 1,
    currentPage: 2,
    expectedReturns: [
      [
        users[0].tasks[1]
      ], [
      ]
    ]
  },
  {
    pageSize: 2,
    currentPage: 1,
    expectedReturns:[
      [
        users[0].tasks[0],
        users[0].tasks[1]
      ], [
        users[1].tasks[0]
      ]
    ]
  }
]

function runPaginationTest(user, pageConfig) {
  const user_index = users.indexOf(user);
  test("Test getting tasks with success :" + user.userId +" for pagesize:" + pageConfig.pageSize + " and currentPage:" +pageConfig.currentPage, async () => {
    const response = await request(app)
      .get("/task/forUser/" + user.userId)
      .set("authorization", user.jwt)
      .query({ pagesize: pageConfig.pageSize, currentpage: pageConfig.currentPage });
    expect(response.body).toEqual({
      message: "Successfully fetched tasks",
      user: {_id: user.userId, email:user.email},
      tasks: pageConfig.expectedReturns[user_index],
      taskCount: user.tasks.length
    });
    expect(response.statusCode).toBe(200);
  });
}

for (let user of users) {
  for (let pageConfig of pagination_tests) {
    runPaginationTest(user, pageConfig);
  }
}
