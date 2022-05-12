const express = require('express')
const cors = require('cors')
const { randomUUID } = require('crypto')
const app = express()

const mongoose = require('mongoose')

const GameModel = require('./models/Games')

mongoose.connect('mongodb+srv://canosaer:CqKa$bFc5QyJ5CH@cluster0.b8iax.mongodb.net/sketchly?retryWrites=true&w=majority', {useNewUrlParser: true})


const port = 1337

//creates front-end
app.use(express.static('blackbox-client'))
app.use(express.json())
app.use(cors())

app.get('/insert', async (req,res) => {
  const game = new GameModel({
    name: 'brave traveler',
    contributors: ['Mr. Robot', 'Whiterose'],
    turn: 2,
    phrases: 'Evil Corp',
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