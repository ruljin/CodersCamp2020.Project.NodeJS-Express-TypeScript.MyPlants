import { mongoose } from '../server';
// import { PlantSchema } from './plant';

const NoteSchema = new mongoose.Schema({/* TODO */})

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
  // plants: [PlantSchema],
  notes: [NoteSchema]
});

export default mongoose.model('user', UserSchema);
