import {mongoose} from '../server'

export const SpeciesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export default mongoose.model('species', SpeciesSchema);

