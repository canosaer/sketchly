const mongoose = require('mongoose')

const SketchlySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    accessedBy: [{ 
        type: String,
    }],
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
    images: [{
        type: String,
    }],
    active: {
        type: Boolean,
        required: true
    },
    onTurn: {
        type: String,
    },
    password: {
        type: String,
    },
    flagged: {
        type: Boolean,
        required: true
    },
}, {timestamps: true})

const GameModel = mongoose.model('games', SketchlySchema)

module.exports = GameModel