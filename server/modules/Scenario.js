// models/Scenario.js
const mongoose = require('mongoose');

const ScenarioSchema = new mongoose.Schema({
  scenarioNumber: Number,
  scenarioTitle: String,
  scenarioDifficulty: String,
  scenarioImpact: String,
  tactic: String,
  description: String,
  attackFlow: [String],
  recommendations: [{
    systemName: String,
    mitigations: [String]
  }],
  photos: [String],
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Disapproved'],
    default: 'Pending'
  },
});

module.exports = mongoose.model('Scenario', ScenarioSchema);
