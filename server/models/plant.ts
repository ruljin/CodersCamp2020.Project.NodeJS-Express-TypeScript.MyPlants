import * as mongoose from 'mongoose';

const defaultPlantUrl = 'https://res.cloudinary.com/ded5al291/image/upload/v1614255324/My%20Plants/logo-plant-leaf_bsnbcb.png';

export const CommentSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  image_path: {
    type: String,
    default: defaultPlantUrl
  }
});

export const ToxicitySchema = new mongoose.Schema({
  human: {
    type: Boolean,
    required: true
  },
  animal: {
    type: Boolean,
    required: true
  }
});

export const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  latin_name: {
    type: String,
    required: true,
    unique: true
  },
  min_temperature: {
    type: Number,
    required: true
  },
  max_temperature: {
    type: Number,
    required: true
  },
  watering: {
    type: String,
    required: true
  },
  watering_method: {
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
    default: defaultPlantUrl
  },
  accepted: {
    type: Boolean,
    required: true
  },
  species: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'species',
    required: true
  },
  comments: {
    type: [CommentSchema]
  },
  toxicity: {
    type: [ToxicitySchema],
    required: true
  }
});

export const comment = mongoose.model('comment', CommentSchema);
export const toxicity = mongoose.model('toxicity', ToxicitySchema);
export const plant = mongoose.model('plant', PlantSchema);
