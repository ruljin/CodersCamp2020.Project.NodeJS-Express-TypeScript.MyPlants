import {mongoose} from './example'

const SpeciesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const Species = mongoose.model('specie', SpeciesSchema);

module.exports = Species