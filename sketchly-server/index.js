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
    lastUpdated: Date.now(),
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

  if(req.body.action === 'UPDATE_ACCESS'){
    GameModel.findOne({nameLower: req.params.name.toLowerCase()}, (err, result) => {
      if (err) {
        res.send(err)
      } else {
        const game = result
        game.accessedBy.push(req.body.userID)
        game.lastUpdated = Date.now()
        game.save()
      }
    })
  
    GameModel.findOneAndUpdate({name: req.params.name}, { $push: { accessedBy: req.body.userID } })
    res.send('access updated')
  }
  else if(req.body.mode === 'draw'){
    GameModel.findOne({nameLower: req.params.name.toLowerCase()}, (err, result) => {
      if (err) {
        res.send(err)
      } else {
        const game = result
        if(!game.active){
          game.images.push(req.body.image)
          game.contributorNames.push(req.body.userName)
          if(game.turn === 1) game.phrases.push(req.body.phrase)
          game.turn = game.turn + 1
          game.lastUpdated = Date.now()
          game.lastTurn = Date.now()
          game.active = true
          game.save()
        }
      }
    })
  }
  else if(req.body.action === 'DEACTIVATE'){
    GameModel.findOne({nameLower: req.params.name.toLowerCase()}, (err, result) => {
      if (err) {
        res.send(err)
      } else {
        const game = result
        const currentTurn = game.turn
        game.active = false
        setTimeout(() => {
          if(!game.active && game.turn === currentTurn) game.active = true
        }, "600000")
        game.save()
      }
    })
  }
  else if(req.body.action === 'REACTIVATE'){
    GameModel.findOne({nameLower: req.params.name.toLowerCase()}, (err, result) => {
      if (err) {
        res.send(err)
      } else {
        const game = result
        game.active = true
        game.save()
      }
    })
  }

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
  GameModel.findOne({nameLower: req.params.name.toLowerCase()}, (err, result) => {
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

app.listen(port, () => {
  console.log(`Sketchly server listening on port ${port}`)
})