import * as mongoose from 'mongoose';

const defaultPlantUrl = 'https://res.cloudinary.com/ded5al291/image/upload/v1614255324/My%20Plants/logo-plant-leaf_bsnbcb.png';

export const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'plant',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: ''
  },
  private: {
    type: Boolean,
    required: true
  }
});

export const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId
  },
  date: {
    type: Date,
    required: true
  }
});

export const CalendarSchema = new mongoose.Schema({
  events: {
    type: [EventSchema]
  }
});

export const FavouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

export const UserToxicitySchema = new mongoose.Schema({
  human: {
    type: Boolean,
    required: true
  },
  animal: {
    type: Boolean,
    required: true
  }
});

export const UserPlantSchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'plant',
    required: true
  },
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
  species: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'species',
    required: true
  },
  toxicity: {
    type: UserToxicitySchema,
    required: true
  }
});

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  plants: [UserPlantSchema],
  notes: [NoteSchema],
  calendar: CalendarSchema,
  favourites: [FavouriteSchema]
});

export const Event = mongoose.model('event', EventSchema);
export const Calendar = mongoose.model('calendar', CalendarSchema);
export const User = mongoose.model('user', UserSchema);
export const Note = mongoose.model('note', NoteSchema);
export const Favourites = mongoose.model('favourites', FavouriteSchema);
export const UserToxicity = mongoose.model('userToxicity', UserToxicitySchema);
export const UserPlant = mongoose.model('userPlant', UserPlantSchema);
