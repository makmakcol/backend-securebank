const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin)!== -1 || !origin) {     // allows allowed Origins and testing tools like Postman to access API 
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true, // sets Access-Control-Allow-Credentials header
    optionsSuccessStatus: 200
}

module.exports = corsOptions

