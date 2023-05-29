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
  recommendations: [String],
  photos: [String],
});

module.exports = mongoose.model('Scenario', ScenarioSchema);
