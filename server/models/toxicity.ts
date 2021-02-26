const mongoose = require('mongoose');

const ToxicitySchema = new mongoose.Schema({
    human: {
        type: Boolean,
        required: true
    },
    animal: {
        type: Boolean,
        required: true
    }
})

const Toxicity = mongoose.model('toxicity', ToxicitySchema);

module.exports = Toxicity