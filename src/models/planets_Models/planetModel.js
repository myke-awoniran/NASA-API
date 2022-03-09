const Mongoose = require('mongoose');
const planetSchema = Mongoose.Schema({
  kepler_name: {
    type: String,
    require: true,
  },
});
module.exports = Mongoose.model('HabitablePlanets', planetSchema);
