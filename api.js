const express = require('express')
const cors = require('cors')
const topics = require('./publicForum.json')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())



app.get('/', (req, res) => res.send('Hello World!'))

app.get('/topics', (req,res) => res.json(topics))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

