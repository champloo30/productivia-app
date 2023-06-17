const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path =  require('path')
require('dotenv').config({ path: './config.env' })

// import routes middlewares
const noteRouter = require('./routes/note.routes')
const taskRouter = require('./routes/task.routes')
const userRouter = require('./routes/user.routes')

const app = express()

const PORT = process.env.PORT || 5000
const ATLAS_URI = process.env.ATLAS_URI

// middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// static
app.use(express.static(path.join(__dirname, '/client/build/')))

// routes middlewares
app.use('/api/task', taskRouter)
app.use('/api/note', noteRouter)
app.use('/api/user', userRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/'))
})

mongoose.set('strictQuery', false);

mongoose.connect(String(ATLAS_URI), {
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