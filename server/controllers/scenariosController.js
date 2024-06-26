// controllers/scenariosController.js
const Scenario = require('../modules/Scenario');

exports.createScenario = async (req, res) => {
  const scenario = new Scenario(req.body);
  await scenario.save();
  res.status(201).send(scenario);
};

exports.getScenarios = async (req, res) => {
  const scenarios = await Scenario.find();
  res.send(scenarios);
};

exports.updateScenario = async (req, res) => {
  const scenario = await Scenario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!scenario) {
    return res.status(404).send('Scenario not found');
  }
  res.send(scenario);
};

exports.deleteScenario = async (req, res) => {
  const scenario = await Scenario.findByIdAndRemove(req.params.id);
  if (!scenario) {
    return res.status(404).send('Scenario not found');
  }
  res.send(scenario);
};

exports.getLatestScenarioNumber = async (req, res) => {
  try {
    const latestScenario = await Scenario.findOne().sort({ scenarioNumber: -1 }).limit(1);
    const latestScenarioNumber = latestScenario ? latestScenario.scenarioNumber : 0;
    res.send({ latestScenarioNumber });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching the latest scenario number');
  }
};

exports.approveScenario = async (req, res) => {
  const scenario = await Scenario.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
  if (!scenario) {
    return res.status(404).send('Scenario not found');
  }
  res.send(scenario);
};

exports.disapproveScenario = async (req, res) => {
  const scenario = await Scenario.findByIdAndUpdate(req.params.id, { status: 'Disapproved' }, { new: true });
  if (!scenario) {
    return res.status(404).send('Scenario not found');
  }
  res.send(scenario);
};

exports.removeAllPhotos = async (req, res) => {
  try {
    // Update all scenarios, setting the photos array to empty
    const updateResult = await Scenario.updateMany({}, { $set: { photos: [] } });
    if (updateResult.matchedCount === 0) {
      return res.status(404).send('No scenarios found to update.');
    }
    res.send({ message: 'Photos removed from all scenarios', updatedCount: updateResult.modifiedCount });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error removing photos from scenarios');
  }
};
