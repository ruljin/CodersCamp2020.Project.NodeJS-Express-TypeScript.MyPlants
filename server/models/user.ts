import * as mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
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

const FavouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
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
    required: true
  },
  plants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'plant'
  },
  notes: [NoteSchema],
  calendar: CalendarSchema
});

export const Event = mongoose.model('event', EventSchema);
export const Calendar = mongoose.model('calendar', CalendarSchema);
export const User = mongoose.model('user', UserSchema);
export const Note = mongoose.model('note', NoteSchema);
export const Favourites = mongoose.model('favourites', FavouriteSchema);
