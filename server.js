const express = require('express')
const app = express()
const cors = require('cors')
const path =  require('path')
require('dotenv').config({ path: './config.env' })
const port = process.env.PORT || 5000

const myTasksRoutes = require('./routes/myTasks')
const myNotesRoutes = require('./routes/myNotes')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

// static
app.use('/public', express.static(__dirname + '/public'))

// dynamic
app.use('/route', myTasksRoutes)
app.use('/route', myNotesRoutes)

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/public' + '/index.html')
})

const dbo = require('./db/conn')

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    })
    console.log(`Server running on port: ${port}`);
})