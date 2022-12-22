require('dotenv').config()
// Always require and configure near the top
require('./config/database');
// Connects Database 
const express = require('express')
const path = require('path') //comes with node.js 
const favicon = require('serve-favicon') //find with npm 
const logger = require('morgan') // morgan isnt the only logger that exist 
const PORT= process.env.PORT || 3001


const app = express() // return app object 



app.use(express.json()) //gives us our req.body 
app.use((req,res,next) => {
    res.locals.data = {}
    next()
    //allows us to use locals in the routes
})
app.use(logger('dev')) // helps us debugged 
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico'))) //_dirname is my directory/build folder/file name favicon.ico 
app.use(express.static(path.join(__dirname, 'build')))



// Check if token and create req.user
app.use(require('./config/checkToken'))

/*
app.use('/api', routes) <===== Finish code once you got it 
*/

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'))
app.use('/api/fruits', require('./routes/api/fruits'))

app.get('/api/test', (req,res) => {
    res.json({'eureka': 'you have found it'})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'build', 'index.html'))
}) // catch all files 

app.listen(PORT,  () => {
    console.log(`I am listening on ${PORT}`)
})
