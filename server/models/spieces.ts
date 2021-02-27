import {mongoose} from '../server'

const SpeciesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export const Species = mongoose.model('species', SpeciesSchema);

