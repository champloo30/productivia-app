const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config({ path: './config.env' })
const port = process.env.PORT || 5000

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

// static
const root = path.join(__dirname, 'client', 'build')

app.use(express.static(root))

app.get('/', function(req, res) {
    res.sendFile('index.html', { root })
})

// dynamic
app.use(require('./routes/myTasks'))
app.use(require('./routes/myNotes'))

const dbo = require('./db/conn')

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    })
    console.log(`Server running on port: ${port}`);
})