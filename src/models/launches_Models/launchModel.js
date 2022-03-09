const Mongoose = require('mongoose');

const launchSchema = Mongoose.Schema({
  mission: {
    type: String,
    require: true,
  },
  launchDate: {
    type: Date,
    require: [true, 'we need a date to launch '],
  },
  rocket: {
    type: String,
    require: [true, 'kindly select the rocket type'],
  },
  flightNumber: {
    type: Number,
    require: true,
    default: 100,
    min: 100,
    max: 999,
  },
  target: {
    type: String,
  },
  upcoming: {
    type: Boolean,
    default: true,
  },
  success: {
    type: Boolean,
    default: true,
  },
  customers: [
    {
      type: String,
      require: true,
      default: 'NASA',
    },
  ],
});

module.exports = Mongoose.model('launch', launchSchema);
