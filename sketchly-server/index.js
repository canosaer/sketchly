const express = require('express')
const cors = require('cors')
const app = express()
const { randomUUID } = require('crypto')

require('dotenv').config()

const mongoose = require('mongoose')

const GameModel = require('./models/Games')

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true})


const port = process.env.PORT || 1337

app.use(express.static('sketchly-client'))
app.use(express.json())
app.use(cors())

app.post('/games', async (req, res) => {

  let game = new GameModel({
    name: req.body.name,
    nameLower: req.body.name.toLowerCase(),
    turn: 1,
    active: false,
  })
  if (req.body.password) game.password = req.body.password

  await game.save()

  res.send(`${game.name} created`)
  
})

app.patch('/games/:name', async (req, res) => {

  let game = new GameModel({
    name: req.body.name,
    nameLower: req.body.name.toLowerCase(),
    turn: 1,
    active: false,
  })
  if (req.body.password) game.password = req.body.password

  await game.save()

  res.send(`${game.name} created`)
  
})

app.get('/games', (req, res) => {
  GameModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

app.get('/games/:name', (req, res) => {
  GameModel.find({nameLower: req.params.name.toLowerCase()}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

app.listen(port, () => {
  console.log(`Sketchly server listening on port ${port}`)
})