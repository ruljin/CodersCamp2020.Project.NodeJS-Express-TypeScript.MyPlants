import {mongoose} from './example';

const ToxicitySchema = new mongoose.Schema({
    human: {
        type: String,
        required: true
    },
    animal: {
        type: String,
        required: true
    }
})

const Toxicity = mongoose.model('toxicity', ToxicitySchema);

module.exports = Toxicity
