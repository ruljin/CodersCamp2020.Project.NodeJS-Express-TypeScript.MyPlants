const mongoose = require('mongoose');

const ExampleSchema = new mongoose.Schema({
    name: String,
    example: Number
})

const Example = mongoose.model('example', ExampleSchema);

module.exports = Example