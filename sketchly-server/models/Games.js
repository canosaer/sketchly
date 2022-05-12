const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
    color: {
        type: String
    },
    time: {
        type: Number,
    },
    x: {
        type: Number,
    },
    y: {
        type: Number,
    },
})

const SketchlySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contributors: [{ 
        type: String,
    }],
    turn: {
        type: Number,
        required: true,
    },
    phrases: [{
        type: String,
    }],
    images: [[pointSchema]],
    active: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
    }
}, {timestamps: true})

const GameModel = mongoose.model('games', SketchlySchema)

module.exports = GameModel