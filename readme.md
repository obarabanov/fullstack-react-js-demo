About
----------

This is a **fullstack web app** demoing techs and functionality listed below:

Tech stack
----------
* JavaScript (ES6)
* React.js
* Node.js
* Restify
* Mocha + Chai
* Mongoose
* MongoDB

Functional requirements fully covered:
-------

**Front-end: Build a web page to enter application data** 

* Build a web page with a form to allow user send an application.
* The form has the following fields:
    - gender (available options: "female", "male")
    - firstname
    - lastname
    - email (email format)
    - phone
    - age (1-99)
    - zip (min 3 , max 5 digits)
    - termsAccepted
* Apply form validation: All fields are required and some have additional constraints
(see per field). The form cannot be submitted unless all fields are valid. Provide
visual feedback for the user on which fields need to be corrected.
* Show a success message and hide the form when the form was submitted successfully.
* Apply some CSS styles.

**Server-side: Build REST API to create an application**

- the API can receive the data collected in the form
- apply REST principles
    - use semantically correct HTTP methods
    - use semantically correct HTTP response codes
- use JSON as the data exchange format
- apply error handling e.g. when not all required fields are provided (return a
meaningful error message for all fields failing)
- apply API versioning
- write an integration test against the API to make sure your implementation works
(cover the success as well as the error case where the API returns error messages)

**DB: Store the application in a database**
- Receive the data from REST API and store it in a database
- Apply data validation at the database level

Prerequisites
----------

MongoDB required. 
Be sure ```/db/mongoose.js``` has proper configuration, so your MongoDB instance is reachable.  

How to run
----------

```
npm install
npm start
```

Log output (to stdout by default) will be pre-formatted to be readable.  

Testing
-------

To run integration test:

```npm test```

