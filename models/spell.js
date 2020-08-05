const mongoose = require('mongoose');

const spellSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Spell name is missing'
    },
    level: {
        type: String,
        required: true
    },
    school: String,
    ritual: Boolean,
    casting_time: String,
    range: String,
    components: [String],
    materials: String,
    duration: String,
    description: {
        type: String,
        trim: true
    }
});

// spellSchema.index({
//     name: 'text'
// });

module.exports = mongoose.model('Spell', spellSchema);