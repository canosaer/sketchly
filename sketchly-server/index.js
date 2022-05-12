const express = require('express')
const cors = require('cors')
const { randomUUID } = require('crypto')
const app = express()
require('dotenv').config()

const mongoose = require('mongoose')

const GameModel = require('./models/Games')

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true})


const port = process.env.PORT || 1337

app.use(express.static('blackbox-client'))
app.use(express.json())
app.use(cors())

app.get('/insert', async (req,res) => {
  const game = new GameModel({
    name: 'nightman',
    contributors: ['Dayman', 'Charlie'],
    turn: 2,
    phrases: 'Troll Toll',
    images: [[{
      color: "black",
      time: 1652313622969,
      x: 162.703125,
      y: 220,
    }]],
    active: false,
  })
  await game.save()
  res.send('inserted data')
})

app.get('/read', (req, res) => {
  GameModel.find({}, (err, result) => {
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