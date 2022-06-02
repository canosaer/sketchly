const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()

const mongoose = require('mongoose')

const GameModel = require('./models/Games')
const PhraseModel = require('./models/Phrases')

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

app.post('/phrases', async (req, res) => {

  // let phrase = new PhraseModel({
  //   content: "A boy and a girl sitting on a bench",
  //   available: true,
  // })

  // await phrase.save()

  // res.send(`${phrase.content} added`)
  
})

app.patch('/games/:name', async (req, res) => {

  GameModel.find({nameLower: req.params.name.toLowerCase()}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      result[0].accessedBy.push(req.body.userID)
      result[0].save()
    }
  })

  GameModel.findOneAndUpdate({name: req.params.name}, { $push: { accessedBy: req.body.userID } })
  res.send('access updated')
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

app.get('/phrases', async (req, res) => {
  PhraseModel.findOne({ available: true }, (err, result) => {
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