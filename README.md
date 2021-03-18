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


## Running using docker.
### Pre-requisites
1. Docker client version 19.03.8
2. Docker server version 19.03.8

### 1 time installation
The following command will build the image required to run the container, and it will install all the requirements. The command builds an image with the node, npm and angular cli installed. The image is named assignment. You can change the name of the image if you want, but you will also have to change the name of the image in the run_in_container.sh file.

```docker image build -t assignment:latest -f docker_images/node_image docker_images/```

### Running commands via the contianer.
Once the required image is built, you can run all the standard commands that you would normally use for node and angular, by prepending it with the words "./run_on_container.sh"
For example, if you want to build a new angular project, run the command:

```./run_in_container.sh ng new new_project```

To get into the node terminal run the command

```./run_in_container.sh node```

**CAUTION**: The run_in_contianer maps the current folder into the container at the /code location. This means only this folder and it's contents are available to the container. Please do not try to access anything before the current folder.
