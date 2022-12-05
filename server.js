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

console.log(path.join(__dirname, '/client/build'));

// static

app.use(express.static(path.join(__dirname, '/client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build'))
})

// dynamic
app.use(myTasksRoutes)
app.use(myNotesRoutes)

const dbo = require('./db/conn')

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    })
    console.log(`Server running on port: ${port}`);
})