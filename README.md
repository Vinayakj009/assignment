# Assignment for 2nd round of Interview at (I prefer not to say)

## Problem statement
This is the problem statement that was given to me.

### Part 1: User  API : Completed
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
***NOTICE***: I have just taken a dump of the docker version and docker-compose version and stated the version requirements of the programs that were printed. I have not done a deep dive as to whether a lower version of the program or a higher version of the program is compatible with the code. The following version are definitely compatible though.
1. Docker client version 19.03.8
2. Docker server version 19.03.8
3. docker-compose version 1.27.4, build 40524192

### 1 time installation
The following command will build the image required to run the container, and it will install all the requirements. The command builds an image with the node, npm and angular cli installed. The image is named assignment. You can change the name of the image if you want, but you will also have to change the name of the image in the run_in_container.sh file.

```docker image build -t assignment:latest -f docker_images/node_image docker_images/```

Next run the following command to install the require nodejs packages.

```run_in_container.sh npm install```

### Running commands via the contianer.
Once the required image is built, you can run all the standard commands that you would normally use for node and angular, by prepending it with the words "./run_on_container.sh"
For example, if you want to build a new angular project, run the command:

```./run_in_container.sh ng new new_project```

To get into the node terminal run the command

```./run_in_container.sh node```

**CAUTION**: The run_in_contianer maps the current folder into the container at the /code location. This means only this folder and it's contents are available to the container. Please do not try to access anything before the current folder.

### Running the server using the docker-compose file.
Open the docker compose file, and update the following environment variables to allow the server to connect to the relevant mongodb.
If you wish to use the mongodb provided by the docker-compose file, do not make changes to the MONGO_HOST and MONGO_PORT environment variable.
1. MONGO_USERNAME: The username required to access mongo
2. MONGO_PASSWORD: The password required to access mongo
3. MONGO_PORT: The port on which mongo db is running.
4. MONGO_HOST: The ip address where mongo db is running. Do not use "localhost" or "127.0.0.1", as this will resolve to the container. You can use the host ip address on a network such as "192.168.0.105". This will work.
5. MONGO_DB_NAME: The name of the database to which data has to be stored.
6. RANDOM_STRING: This is the random string that was mentioned in the problem statement.

Next run the following command

```docker-compose up```

You can check if the containers are running as expected by running the comamnd

```docker container ls -a```

You can stop the containers running on your system by running the following command.

```docker-compose down```

### Running the server using a container.
To run a single node instance using the container, first go to package.json and update the environment variables required for configuring the connection to the Mongo db. Use the instructions given in the header "Running the server using the docker-compose file." to understand what variables have to be set.

The environment variables are present for the script start:node_with_env

In addition to these environment variables, the start:node_with_env script also includes a PORT environment variable. This can be used to set a numeric port or a named pipe.

Next run the following command

```run_in_container.sh npm run start:node_with_env```


## Running without using docker.

### Pre-requisites
***NOTICE***: I have just taken a dump of the npm version and stated the version requirements of the programs that were printed. I have not done a deep dive as to whether a lower version of the program or a higher version of the program is compatible with the code. The followign version are definitely compatible though.
1. npm: '7.4.3',
1. node: '15.7.0',
1. v8: '8.6.395.17-node.23',
1. uv: '1.40.0',
1. zlib: '1.2.11',
1. brotli: '1.0.9',
1. ares: '1.17.1',
1. modules: '88',
1. nghttp2: '1.42.0',
1. napi: '7',
1. llhttp: '2.1.3',
1. openssl: '1.1.1i',
1. cldr: '38.1',
1. icu: '68.2',
1. tz: '2020d',
1. unicode: '13.0'

### 1 time installation
Run the following command to install the required node js packages.

```npm install```

### Running the server
To run the nodejs server, you must first configure the environment variables. Please read through the heading "Running the server using a container." to better undrstand the environment variables.

The only exception to environment variables in this case is that, you can use localhost or "127.0.0.1" for mongo host, if you are running the server using locally installed npm.

To start the server use the command.

```npm run start:node_with_env```

## Testing the API
The API can be tested using the postman collection ```assignment.postman_collection.json``` that had been added to the repo.
I have not added test cases to the postman collection as I felt this was outside the scope of the assignment.
