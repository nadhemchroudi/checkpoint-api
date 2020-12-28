let mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number ,
  bestFood: String
});

module.exports = mongoose.model("Person", personSchema);
