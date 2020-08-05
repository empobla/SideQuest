const mongoose = require ('mongoose');

const noteSubSchema = new mongoose.Schema({
    character_id: mongoose.Schema.Types.ObjectId,
    character: String,
    text: {
        type: String,
        trim: true
    }
});

const storySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Story name is required.'
    },
    summary: {
        type: String,
        trim: true
    },
    notes: [noteSubSchema]
});

module.exports = mongoose.model('Story', storySchema);