const mongoose = require('mongoose');
const Comment = require('./comment');

const commentSchema = mongoose.model('Comment').schema;

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
    comments: [commentSchema]
    // notes: [noteSubSchema]
});

characterSchema.index({
    name: 'text',
    relationship: 'text',
    place: 'text',
    race: 'text'
});

module.exports = mongoose.model('Character', characterSchema);