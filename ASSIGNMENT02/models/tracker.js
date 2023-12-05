const mongoose = require('mongoose')

const schemaDefinition = {

    breakfast: {
        type: String,
        required: true
    },
    lunch: {
        type: String,
        required: true
    },
    dinner: {
        type: String,
        required: true
    },

    distanceRan: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    caloriesAte: {
        type: Number,
        required: false
    },

    caloriesBurnt: {
        type: Number,
        required: false
    }
}

var mongooseSchema = new mongoose.Schema(schemaDefinition)

module.exports = mongoose.model('Tracker', mongooseSchema)