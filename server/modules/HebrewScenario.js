// models/HebrewScenario.js
const mongoose = require('mongoose');

const HebrewScenarioSchema = new mongoose.Schema({
  scenarioNumber: Number,
  scenarioTitle: String,
  scenarioDifficulty: String,
  scenarioImpact: String,
  tactic: String,
  description: String,
  attackFlow: [String],
  recommendations: [String],
  photos: [String],
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Disapproved'],
    default: 'Pending'
  },
});

module.exports = mongoose.model('HebrewScenario', HebrewScenarioSchema);
