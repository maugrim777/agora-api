require('dotenv').config()
const express = require('express')
const Controller =require('./controllers/controller.js')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => {console.log("Successfully connected to the database")})
    .catch(err => {
        console.log('Could not connect to database:', err)
        process.exit()})

app.get('/', (req, res) => res.send('Hello World!'))


// Public Forum Routes


app.get('/public/getThreads', Controller.getThreads)

app.post('/newThread', Controller.createThread)



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

