import {mongoose} from './example'

const SpeciesSchema = new mongoose.Schema({
    name: String
})

const Species = mongoose.model('specie', SpeciesSchema);

module.exports = Species