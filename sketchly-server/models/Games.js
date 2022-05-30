const mongoose = require('mongoose')

const SketchlySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nameLower: {
        type: String,
        required: true,
    },
    accessedBy: [{ 
        type: String,
    }],
    contributorNames: [{ 
        type: String,
    }],
    contributorIDs: [{ 
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
    password: {
        type: String,
    },
    flagged: {
        type: Boolean,
    },
}, {timestamps: true})

const GameModel = mongoose.model('games', SketchlySchema)

module.exports = GameModel