🔒SECURE BANK🏦 

MERN FULLSTACK PROJECT -- BACKEND

Welcome to the backend code repository of my first MERN fullstack portfolio project, SECURE BANK. This backend is a RESTful API utilizing MongoDB for database management, 
Express.js for routing, and Node.js for as the runtime environment. CRUD operations are employed throughout this application to integrate and implement user functionality across the deployed application.
This application is deployed on "Render: Cloud Application Hosting for Developers"-- the backend is deployed as web service.  Enjoy exploring the backend code of SECURE BANK!

Check out my splash page!
https://backend-securebank.onrender.com

🔗API ENPOINTS

1. Users

 - CREATE: `POST /users`
    - Creates a new user account and new account is added to the database
    - Public Route
      
  - READ: `GET /users`
    - Retrieves all user data from data base
    - Private Route accessed after login authentication
      
  - UPDATE: `PATCH /users`
    - Updates specific user data and shows update in data base
    - Private Route accessed after login authentication with user ID constraint
   
  - DELETE: `DELETE /users`
    - Deletes specfic user account and data is removed from data base
    - Private Route accessed after login authenticatin with user ID constraint 
       
2. Balance
   
   - CREATE: `POST /balance`
     - Initial deposit of at least $25 to initialize new account
     - Public Route
       
    - READ: `GET /balance?username=${username}`
      - Checks user balance based on a specific username input
      - Private Route accessed after login authentication and username authentication
        
    - UPDATE: `PATCH /balance/deposit, /balance/withdraw`
      - Updates specific user balance with deposit and withdrawal functionalities
      - Private Routes accessed after login authentication and username authentication 
       
3. Authentication
   
   - CREATE: `POST /auth, /auth/logout`
     - Creates access token for user authentication, and logout route clears cookie if it exists
     - Public Routes
    
    - READ: `GET /auth/refresh`
      - Retrieves user refresh token because user access token has expired
      - Public Route
     
 ✨MIDDLEWARE

 1. Built-in
    - Express JSON: Allows app to receive and parse JSON data
    - Express Static: Serves static files
      
 2. Custom
    - logger: Logs information (methods, url, origin, etc.) about each HTTP request
    - errHandler: Logs errors encountered during the request-response cycle
    - mongoErrLog: Records specific MongoDB errors
      
 3. Third-Party
    - cookieParser: Parses cookies attached to the client request object
    - cors & corsOptions: Determines what origins can access the REST API
    - jwt: Facilitates JSON Web Tokens
    - verifyJWT: validates JSON Web Token for authentication 

⚡️TECH STACK

  1. MongoDB
     - NoSQL database offering flexibility in handling a large amount of data without a fixded schema

  2. Express.js
     - Node.js web application framework built as layer of abstraction ontop of Node.js to assist in server and route management

  3. Node.js
     -  A Cross-platform, open-source server environment, enabling the execution of JavaScript code outside of a web browser
       


