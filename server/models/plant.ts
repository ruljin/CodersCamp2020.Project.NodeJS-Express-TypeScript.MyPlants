import {mongoose} from './example'; 
//import {Species} from './species';
//import {Comment} from './comment';
//import {Toxicity} from './toxicity';

const PlantSchema = new mongoose.Schema({
    name: String,
    latinName: String,
    minTemperature: Number,
    maxTemperature: Number,
    watering: String,
    wateringMethod: String,
    subsoil: String,
    conditioners: String,
    spraying: String,
    sunlight: String,
    humidity: String,
    application: String,
    image: String,
    accepted: Boolean,
    //species: Species,
    //comments: Comment,
    //toxicity: Toxicity
})

const Plant = mongoose.model('plant', PlantSchema);

module.exports = Plant