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
  notes: [NoteSchema]
});

export const User = mongoose.model('user', UserSchema);
export const Note = mongoose.model('note', NoteSchema);
