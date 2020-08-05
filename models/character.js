const mongoose = require('mongoose');

const noteSubSchema = new mongoose.Schema({
    character_id: mongoose.Schema.Types.ObjectId,
    character: String,
    text: {
        type: String,
        trim: true
    }
});

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Character name is required.'
    },
    image: String,
    title: String,
    relationship: String,
    affiliation: String,
    place: String,
    race: String,
    class: String,
    age: Number,
    size: String,
    appearance: {
        type: String,
        trim: true
    },
    summary: {
        type: String,
        trim: true
    },
    notes: [noteSubSchema]
});

module.exports = mongoose.model('Character', characterSchema);