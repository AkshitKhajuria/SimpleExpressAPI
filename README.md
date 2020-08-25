# SimpleExpressAPI
Learn the basics of creating an API using Express.js and Node.js. This tutorial follows the Express getting started guide. More detailed documentation can be found at [Express Hello world!](https://expressjs.com/en/starter/hello-world.html)

# Installation
First install - 

 1. [Node.js](https://nodejs.org/en/download/)
 2. [Express.js](https://expressjs.com/en/starter/installing.html)

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
_Routing_  refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

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

### Basic Routing Examples
The following examples illustrate defining simple routes.

Respond with  `Hello World!`  on the homepage:

```javascript
app.get('/', function (req, res) {
  res.send('Hello World!')
})

```

Respond to POST request on the root route (`/`), the application’s home page:

```javascript
app.post('/', function (req, res) {
  res.send('Got a POST request')
})

```

Respond to a PUT request to the  `/user`  route:

```javascript
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

```

Respond to a DELETE request to the  `/user`  route:

```javascript
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
```
The above examples demonstrate some basic routing with the route path `/` . _Routing_ refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
For more details on routing paths refer [basic routing](https://expressjs.com/en/starter/basic-routing.html).
The app uses [Router level](https://expressjs.com/en/guide/using-middleware.html#middleware.router) middleware for for handling requests.

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
