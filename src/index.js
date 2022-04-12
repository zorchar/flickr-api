
const express = require('express')
const cors = require('cors')
const path = require('path')

const port = process.env.PORT
const flickrRouter = require('./routers/flickrRouter')
const publicDirectoryPath = path.join(__dirname, '../public')


const app = express()
app.use(cors())
app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.use(flickrRouter)

app.listen(port, () => {
    console.log('Server connected, port:', port)
})