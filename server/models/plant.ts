import {mongoose} from '../server'; 
//import {Species} from './species';
//import {Comment} from './comment';
//import {Toxicity} from './toxicity';
const url = 'https://res.cloudinary.com/ded5al291/image/upload/v1614255324/My%20Plants/logo-plant-leaf_bsnbcb.png'

const PlantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    latinName: {
        type: String,
        required: true,
        unique: true
    },
    minTemperature: {
        type: Number,
        required: true
    },
    maxTemperature: {
        type: Number,
        required: true
    },
    watering: {
        type: String,
        required: true
    },
    wateringMethod: {
        type: String,
        required: true
    },
    subsoil: {
        type: String,
        required: true
    },
    conditioners: {
        type: String,
        required: true
    },
    spraying: {
        type: String,
        required: true
    },
    sunlight: {
        type: String,
        required: true
    },
    humidity: {
        type: String,
        required: true
    },
    application: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: url,
        required: true
    },
    accepted: {
        type: Boolean,
        required: true
    },
    /*species: {
        type: Species,
        required: true
    }, 
    toxicity: {
        type: Toxicity,
        required: true
    }
    comments: Comment*/
})

export const Plant = mongoose.model('plant', PlantSchema);

