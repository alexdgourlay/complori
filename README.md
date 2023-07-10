# Complori Take-Home Challenge

The project consists of three components:
- A React [frontend](./frontend/) application written in Javascript.
- A Node.js [server](./server/) Express application written in Typescript.
- A Python [script](./scripts/python/) to generate dummy data for the backend.

The frontend application displays a list of courses and allows the user to create new courses. The user can also edit and delete existing courses.

The server application exposes a REST API with the following sub-routes:
- `/courses/` - Exposes CRUD operations for courses
- `/users/` - Exposes CR operations for users

The server interacts with a MongoDB database to store and retrieve data.

A [Postman collection](./complori-api.postman_collection.json) has also been provided to allow the API endpoints to be tested.

The Python script generates dummy data for server by making requests to the API. It creates 2 courses and 3 users.

## Running

The quickest way to run all the services is to use Docker compose, which requires an installation of Docker on your machine, you can find instructions for this [here](https://docs.docker.com/get-docker/).

Execute the following command from the root directory:
```bash
docker compose up
```
This will spin up a MongoDB instance, the server application, the frontend application and will run the Python script. The configuration for this can be found in the [docker-compose.yml](./docker-compose.yml) file.

## Process & Decisions

### Frontend
- The project was scaffolded using [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) to quickly initialise a React project.
    - This could also be achieved using a custom transpiler / bundler configuration.
    - By default this creates a Single Page Application (SPA) - which is suitable for the requirements of this project.
- Styles for the project have been writen in css modules which allows them to be scoped to the component they are used in.
  - Theming has not been implemented for this project, colors and spacing have been defined in-place rather than using variables, this could be added in the future.
- Data fetching has been implemented using [React Query](https://react-query.tanstack.com/).
  - The server url is currently hard coded but should be moved to an environment variable in the future.
  - This library simplifies data fetching and caching.
    - The request to get all course data is refetched when a mutation occurs, either when a new course is created or when an existing course is updated or deleted.
    - For responsiveness, an optimistic update has been implemented upon course deletion.
    - Data is refetched when the window is refocused.
  - All functions for fetching data have been defined in a separate file to allow for reusability.
- A modal component has been used to display the course edit and create forms
  - The React specialisation pattern has been used to allow the common functionality to be shared between the two forms.  
  - The controlled form pattern has been used to allow default values to be supplied and for React to manage the form state.
  - Basic form validation has been implemented using the `required` attribute on the input elements. Further validation could be introduced in the future.
  

### Server
- The project was manually set up as a Typescript Node.js application.
- The MongoDB connection string has been hard coded but should be moved to an environment variable in the future.
- The project structure separates out the routes, controllers, services and models into separate directories.
  - The dependency injection pattern has been followed whereby the services are injected into the controllers. This allows for instances to be easily mocked, and to be potentially swapped out in the future.
- The GET/POST/PATCH/UPDATE/DELETE HTTP methods have been used for their respective CRUD operations.
- The application uses [Mongoose](https://mongoosejs.com/) to interact with the MongoDB database.
  - Mongoose allows for the definition of schemas which are used to validate data for the update and create operations.
  - The schemas for the courses and users are defined in the [models](./server/src/models/) directory.
  - Further validation is implemented in the schemas middleware, for example members added to a course must not be duplicared and they must exist within the users collection.

### MongoDB / Data Model
- MongoDB was chosen as the database for this project primarily due to its ease of use.
- The User data model is very simple and only consists of a name.
  - This could be extended in the future with a member type, so that only valid coaches can be assigned as a coach course.
- Relationships between the course and users have been defined using references, rather than embedding the user data within the course.
    - This allows for the user data to be updated in one place, rather than having to update all courses that the user is assigned to.


### Python Script
- This script imports the [urllib3](https://urllib3.readthedocs.io/en/latest/) library to make HTTP requests to the API.
- Functions for the creation of the courses and users are defined for reusability.
- Since the script relies on the server to be running when the services are composed, a helper bash script [wait-for-it](./scripts/python/wait-for-it.sh) is used to wait for the server to be ready before running the script.