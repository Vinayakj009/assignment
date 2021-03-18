# Assignment for 2nd round of Interview at (I prefer not to say)

## Problem statement
This is the problem statement that was given to me.

### Part 1: User  API
1. Create an express server running on port 8000
2. Create a users table in DB (MySQL/MongoDB)
   1. users table should have 2 columns/properties i.e. email and password
3. Build 2 APIs
   1. POST API for creating a new user
   2. DELETE API for deleting an existing user
   3. Both the APIs should be accessible only if a valid token (random string) is present in the HTTP header
4. Push the code in github repository
5. Share the link and DB dump

### Part2: User and Tasks - APis
 
 -  One user can work on many tasks

1. User login functionality with jwt authentication and token should be used while accessing subsequent apis 

2. get all users with pagination
   - sample route "/users"

3. get single user along with his all tasks
   sample route "/users/:id"

4. test cases using jest/mocha covering the functionality
