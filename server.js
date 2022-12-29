const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const path =  require('path')
require('dotenv').config({ path: './config.env' })

const app = express()

const PORT = process.env.PORT || 5000
const ATLAS_URI = process.env.ATLAS_URI

app.use(bodyParser.json())
app.use(cors())

const taskRoutes = require('./routes/task.routes')
const myNotesRoutes = require('./routes/note.routes')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// static
app.use(express.static(path.join(__dirname, '/client/build/')))

// dynamic
app.use('/api/task', taskRoutes)
app.use(myNotesRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/'))
})

mongoose.set('strictQuery', false);

mongoose.connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to MongoDB.')
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})