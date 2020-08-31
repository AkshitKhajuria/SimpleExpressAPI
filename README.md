
# SimpleExpressAPI
Learn the basics of creating an API using Express.js and Node.js. This tutorial follows the Express getting started guide. More detailed documentation can be found at [Express Hello world!](https://expressjs.com/en/starter/hello-world.html)

# Installation
First install - 

 1. [Node.js](https://nodejs.org/en/download/)
 2. [Express.js](https://expressjs.com/en/starter/installing.html)

Optional -
 1. [nodemon](https://www.npmjs.com/package/nodemon)

Clone the repo, navigate to the *hello express* directory and run the following command in your terminal -

    npm install

# Running the app
Type the following command and hit *Enter*.

    npm run start

The app will listen on **localhost:3000**. You can try to send [http requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and perform basic [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations.

The app uses a **list** as a from of a primitive database to perform CRUD operations. The simple "database" will store and manipulate user data of the JSON format - 

    {
	    "fname":"First Name",
	    "lname":"Last Name",
	    "id":<number>
    }

# Overview
### Adding a new user
Send a PUT/ POST request with the data in the request body.
**PUT** requests can insert new data and update existing data.
**POST** behaves likewise except without update functionality.
### Fetching data
**GET** request fetches all the items in the database.
### Deleteing users
**DELETE** request needs 'id' as the query parameter and will delete the first users it finds with that id.  For example, deleting a user with the id '12' will have the DELETE request uri as -

    localhost:3000/users?id=12

# Routing
> _Routing_  refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, > POST, and so on). See [basic routing](https://expressjs.com/en/starter/basic-routing.html) for more info.

Each route can have one or more handler functions, which are executed when the route is matched.

First create an instance of express by -

```javascript
var express = require('express')
var  app  =  express();
```
    
A route definition takes the following structure:

    app.METHOD(PATH, HANDLER)

Where:

-   `app`  is an instance of  `express`.
-   `METHOD`  is an  [HTTP request method](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), in lowercase.
-   `PATH`  is a path on the server.
-   `HANDLER`  is the function executed when the route is matched.

### Basic Routing Example
The following examples illustrate defining simple routes.

Respond with  `Hello World!`  on the homepage:

```javascript
app.get('/', function (req, res) {
  res.send('Hello World!')
})
```
# The App Structure

### Routers
This app uses [router level middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.router) to handle requests. The routes are defined in `./routes` directory. To make a router - 
```javascript
var express = require('express');
var router = express.Router();
```
A router to handle POST request on the users route (`/users`), the application’s home page will look like this -

```javascript
router.post('/', function (req, res) {
  res.send('Got a POST request')
})
```
Although [middlewares](https://expressjs.com/en/guide/writing-middleware.html) can be defined like this, seperating the function definition and routes is a good idea. So the above code can be transformed to something like - 
```javascript
// import a function, say foo

// use in a post request
router.post('/', foo);
```
Now this looks more neat!

Each callback to `router.METHOD("path", callback function)` has access to three special properties give by express- 
1. request - the recieved user request.
2. response and - used to send responses.
3. next - used to call the next middleware.

After defining all routes and middlewares, just export the router for use.
```
module.exports = router;
```

### Database 
The database for this tutorial is just a simple JS array. The data items will be added as objects using the format mentioned before. The database is in `./models` directory and also has a helper function to find a data item index by userID. Multiple database schemas can be defined here and then used as per need basis.
```javascript
// the "database" is a simple array for this case
var  users  =  [];
```

### Functionality
The app seperates functionality by defining the methods used by routes in the `./modules` directory. As you'll see, it contains a `userModules.js` file with all the functions that perform various CRUD operations. You can have other files for handling context specific operations. For eg - a file that has methods for adding/editing comments or uploading images.

Since these methods will manipulate the database we need to import the database first - 

```javascript
// user "database"
var userModel = require("../models/userModel");
// get the database
var users = userModel.users;
// This function finds users index by taking an id
// and was defined along with the database
var findIndexById = userModel.findIndexById;
```

Respond to a GET request:

```javascript
function getUser(req, res, next){
res.send({users});
}
```
Without sending back a response, the app will appear 'stuck'. Make sure to send back a response or end it. It's a good practice to also mention the [status code](https://www.restapitutorial.com/httpstatuscodes.html#) -
```javascript
res.status(200).send({message:"whopee!", status:"sucess"})
```
All the functions are exported using -
```javascript
module.exports  =  {getUser,putUser,.......};
```
Notice that all functions are exported as JSON objects.

### Routes
Now that the functionality and database has been defined, the routes are set to handle the various requests. Each functionality is first imported and the respective functions are given as callbacks to the routes. The routes are defined in `users.js` under `./routes`  directory. Notice how clean the code looks as the methods and database are defined in separate files and simply imported for use here.
```javascript
//import the methods
var usr_module = require('../modules/userModule');
```
```javascript
// create a router
var express = require('express');
var router = express.Router();
//set the route handlers

// Get all users
router.get('/', usr_module.getUser);
// insert/update a user
router.put('/', usr_module.putUser);
// insert a new user, ignore if id already exists
router.post('/', usr_module.postUser);
//delete a user
router.delete('/',usr_module.deleteUser);
//export this for the main app to use.
module.exports = router;
```
And that's it for the routes!

> **Note:** A path can have multiple callbacks to handle the request. For example, we can first call a function to validate information before updating a piece of information > in the database - 
```javascript
function validate(req, res, next){
	//validate information
	//if everything is ok
	next()
	//otherwise throw an error or send an error response
	res.status(400).send({message:"invalid data"})
}
router.patch('/', validate, someOtherFunction, ....);
```
You must call `next()` to let the control flow to the next callback in line!

### How The Router is Used

The main app `app.js` in the root directory uses this router to handle all requests made to `localhost:3000/users/` by -
```javascript
// import the router for users
var  usersRouter  =  require('./routes/users');
// create app by calling express()
var  app  =  express();

// tell the app to use the router 
// for the path '/users'
app.use('/users',  usersRouter);
.
.
// more code
```

### That's all folks!

# License [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
MIT License

Copyright (c) 2020 Akshit Khajuria

Permission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is

furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

SOFTWARE.
