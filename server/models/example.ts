import * as mongoose from 'mongoose';

export const ExampleSchema = new mongoose.Schema({
  name: String
});

export const example = mongoose.model('message', ExampleSchema);
