
require('dotenv').config() // allows dotenv to be used throughout package
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger') // custom middleware
const errHandler = require('./middleware/errHandler') // custom middleware
const cookieParser = require('cookie-parser') // 3rd party middleware
const cors = require('cors') // 3rd party middleware
const corsOptions = require('./config/corsOptions') // 3rd party middleware
const connectDB = require('./config/dbConnect') // connects to MongoDB
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger) // custom middleware: logs information (methods, url, origin, etc.) about each HTTP request

app.use(cors(corsOptions)) // 3rd party middlewares: limits what origins can access my REST API 

app.use(express.json()) // built in middleware: allows app to receive and parse json data

app.use(cookieParser()) // 3rd party middleware: parses cookies attached to the client request object

app.use('/', express.static(path.join(__dirname, 'public'))) // built in middleware: serves static files 

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/balance', require('./routes/balanceRoutes'))
app.use('/auth', require('./routes/authRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
}) 

app.use(errHandler) // custom middelware: logs errors that occur during the request-response cycle

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log')
}) // logs to new file--mongoErrLog.log 
    // Errors logged: error number, code, system call, and hostname
