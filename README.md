🔒SECURE BANK🏦 

MERN FULLSTACK PROJECT -- BACKEND

Welcome to the backend code repository of my first MERN fullstack portfolio project, SECURE BANK. This backend is a RESTful API utilizing MongoDB for database management, Express.js for routing, and Node.js as the runtime environment. CRUD operations are integrated throughout the application to deliver a wide range of user functionalities. The application is hosted on "Render: Cloud Application Hosting for Developers", with the backend deployed as a web service. Enjoy exploring the backend code of SECURE BANK!

Check out my splash page!
https://backend-securebank.onrender.com

🔗API ENPOINTS

1. Users

 - CREATE: `POST /users`
    - Creates a new user account and new account is added to the database
    - Public Route
      
  - READ: `GET /users`
    - Retrieves all user data from data base
    - Private Route (requires login authentication)
      
  - UPDATE: `PATCH /users`
    - Updates specific user data and shows update in data base
    - Private Route (requires login authentication with user ID constraint)
   
  - DELETE: `DELETE /users`
    - Deletes specfic user account and data is removed from data base
    - Private Route (requires login authentication with user ID constraint)
       
2. Balance
   
  - CREATE: `POST /balance`
    - Initial deposit of at least $25 to initialize new account
    - Public Route
       
   - READ: `GET /balance?username=${username}`
      - Checks user balance based on a specific username input
      - Private Route (requires login and username authentication)
        
   - UPDATE: `PATCH /balance/deposit, /balance/withdraw`
      - Updates specific user balance with deposit and withdrawal functionalities
      - Private Routes (require login and username authentication)
       
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
       
🚀FUTURE IMPROVEMENTS

 1. Full CRUD Operations for All Controllers
    
     a. Balance
     - DELETE: Allow account closures with neccessary checks and validations to ensure a safe termination of user accounts

     b. Authentication
      - UPDATE: Enable modifications of user authentication details or session information, allowing users to maintain up-to-date security configurations
      - DELETE: Introduce the capability for users to revoke specific active access tokens, ensuring better control over active sessions and enhanced security

 2. Security Enhancements
      - Beyond bcrypt and jwt verification, implement periodic password resets, integrate rate limiters in addition to the login limiter, and explore advanced authentication mechanisms for reinforced security.

 3. Payment Gateway Integrations
    
      a. Stripe
       - Integrate Stripe to facilitate online card payments, subscriptions, and direct payouts
       - Utilize Stripe's webhooks to handle events, such as successful payments or payment failures

     b. PayPal
      - Incorporate PayPal as an alternative payment method, enabling user transactions through PayPal balances and linked accounts
      - Implement the PayPal IPN (Instant Payment Notification) service for real-time transaction updates

  4. Account Recovery Functionality
      
       a. Forgot Password
       - Implement a secure "Forgot Password" feature allowing users to reset their passwords through email verificatio
     
       b. Account Locking
       - Introduce an automatic account locking mechanism after multiple failed login attempts to safeguard user accounts against unauthorized access. Users can then follow a recovery process to regain access

       c. Account Retrieval
        - Offer users the ability to retrieve forgotten usernames or account details through associated email addresses, ensuring a balance between convenience and security

  5. Budget Tracking Tools
      
       a. Expense Analysis
       - Implement algorithms to categorize and analyze individual expenses, enabling users to see a breakdown of their spending by categories such as groceries, dining, transportation, entertainment, etc.
     
       b. Budget Creation
       - Offer users the ability to set monthly or yearly budgets for specific categories or overall spending. Alerts or notifications will be triggered when nearing or exceeding these limits

       c. Historical Data Visualization
        - Provide user-specific graphical representations of spending and savings patterns over time, including deposit and withdrawal visualizations
         
 6. Optimized Database
       - Research and test the implementation of indexing, caching mechanisms, archiving, database backup and recovery, database monitoring and alerts, schema enhancements, as well as scalability as the database grows
         
