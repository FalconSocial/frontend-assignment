# API layer
To support the development of the Task Manager we've provided a REST API layer implementing CRUD actions for a `task` resource. 

## Getting started
The API layer is a simple Sails application. 

Make sure that you provide an environment to support Sails. E.g. relevant version of NodeJS etc.

The setup is a standard Sails application. Any documentation around the setup is covered by the official Sails documentation.

Read more about [Sails here](https://sailsjs.com/).

The setup is provided in the `/server` folder. To get started run the following commands in that folder:

```bash
$ npm install
$ npm start
```

The API should now be available at `http://localhost:1337`.

You're welcome to add and enhance functionallity within the API layer, if it helps you solve the tasks, as long as the overall setup and runtime/framework, i.e. Sails, remains the same.

## Endpoints
The following CRUD operations are available through the API

### Resource: `Task`

```bash
# Get a list of tasks
GET /tasks
```
```bash
# Get a single task 
GET /tasks/:id
```
```bash
# Create a task
POST /tasks
body {
    "title": string, 
    "description": string
}
```
```bash
# Update a task
PATCH /tasks/:id
body {
    # updated fields
}
```
```bash
# Delete a task
DELETE /tasks/:id
```

## Troubleshooting
If you find that the below pointers doesn't resolve the issue(s) please direct any questions to **frontend-assignment@falcon.io**

#### `npm start` doesn't work
Make sure you provide the exact environment required by Sails. From `package.json`:
```json
"engines": {
    "node": "^10.15"
}
```
Make sure you do not have any other process running on port `1337`.

#### I can't connect to the API resources from my client
Out of the box the API works cross origins on the following hosts:
```
http|s://localhost:3000
http|s://localhost:4200
http|s://localhost:8080
```
If you get a cross origin error make sure that your client is running on any of the above hosts. Alternatively you can add your client host in: `/server/config/env/production.js`


