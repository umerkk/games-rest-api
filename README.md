# Welcome to GameListing REST Api

This API is a POC for a GameListing backend system.
The project consists of the following

 - Express based REST API
 - React based basic frontend for adding information.

# Technology Used
The project is written in Typescript and using the following frameworks

 - NodeJS, ExpressJS
 - MongoDB & Mongoose (ODM)
 - React, Sementic-UI (for UI components)

# Development
In order to run the project locally, the project contains all the packages that it need, so there is no need to install any other global package.

### Prerequisites

 - NodeJS version >= 12.0

### Running Locally
After you checkout the project, on the root of the project, run 

`npm install`

it'll install all necessary dependencies including Typescript, mongoose, react etc.

This'll make the project ready for the REST API.

#### Database
For testing purposes, the Cloud MongoDB instance is running and the credentials can be found in `src/common/DatabaseAdapter.ts` file. You can use those credentials with Mongo Compass application to browse the data inside the database.

#### Frontend
The frontend of the application is also contained within the `src/renderer` folder and is itself a micro repo with its own config to enable React development workflows.
Navigate to `src/renderer` folder and run the following command to install necessary dependencies to build the frontend.

`npm install`

Once installed, you can build the project using
`npm run build` 

The Build command, will transpile the React code, bundle it into a single file & move it to the `build` folder in the root of the project. There the API can also render the React UI

# Deployment
The project is shipped with a self contained Docker Image for the API & a Docker compose file that consists of the API & a standalone MongoDB.

### Prerequisites

 - Docker Engine

Navigate to the `root` of the project and run the following command.

`docker-compose up`

you can browse the API by going to 
`http://localhost:8080/`

The UI can be reached at `http://localhost:8080/ui`

### Logs
The REST API server is going to emit logs once it is running either in production or development environment.
A separate folder called `logs` will be created at the `root` of the the project with the following files.

 - `Combined.log` - A combined file that consists of all the logs emitted by the server (severity based on the environment)
 - `Debug.log` - Debugging logs emitted by the server - only available when running outside the production environment)
 - `Error.log`- Errors occurred during the runtime.

## API Documentation

The example & usage of the API has been documented as part of POSTMAN collection, you can view them at https://documenter.getpostman.com/view/4066746/Tzz5veRn

