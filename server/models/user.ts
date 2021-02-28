import * as mongoose from 'mongoose';

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
    type: mongoose.Schema.Types.ObjectID,
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

export const UserSchema = new mongoose.Schema({
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
    type: Number,
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
  notes: [NoteSchema]
});

export const user = mongoose.model('user', UserSchema);
export const note = mongoose.model('note', NoteSchema);
