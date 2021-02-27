import * as mongoose from 'mongoose';

export const SpeciesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export const species = mongoose.model('species', SpeciesSchema);
