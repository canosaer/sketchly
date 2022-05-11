const express = require('express')
const cors = require('cors')
const { randomUUID } = require('crypto')
const app = express()
const port = 1337

//creates front-end
app.use(express.static('blackbox-client'))
app.use(express.json())
app.use(cors())



app.listen(port, () => {
  console.log(`Sketchly server listening on port ${port}`)
})