// controllers/hebrewScenariosController.js

const HebrewScenario = require('../modules/HebrewScenario');

exports.createHebrewScenario = async (req, res) => {
  const scenario = new HebrewScenario(req.body);
  await scenario.save();
  res.status(201).send(scenario);
};

exports.getHebrewScenarios = async (req, res) => {
  const scenarios = await HebrewScenario.find();
  res.send(scenarios);
};

exports.updateHebrewScenario = async (req, res) => {
  const scenario = await HebrewScenario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!scenario) {
    return res.status(404).send('Scenario not found');
  }
  res.send(scenario);
};

exports.deleteHebrewScenario = async (req, res) => {
  const scenario = await HebrewScenario.findByIdAndRemove(req.params.id);
  if (!scenario) {
    return res.status(404).send('Scenario not found');
  }
  res.send(scenario);
};

exports.getLatestHebrewScenarioNumber = async (req, res) => {
    try {
      const latestScenario = await HebrewScenario.findOne().sort({ scenarioNumber: -1 }).limit(1);
      const latestScenarioNumber = latestScenario ? latestScenario.scenarioNumber : 0;
      res.send({ latestScenarioNumber });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error fetching the latest scenario number');
    }
};

exports.approveHebrewScenario = async (req, res) => {
  const scenario = await HebrewScenario.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
  if (!scenario) {
    return res.status(404).send('Scenario not found');
  }
  res.send(scenario);
};

exports.disapproveHebrewScenario = async (req, res) => {
  const scenario = await HebrewScenario.findByIdAndUpdate(req.params.id, { status: 'Disapproved' }, { new: true });
  if (!scenario) {
    return res.status(404).send('Scenario not found');
  }
  res.send(scenario);
};


exports.removeAllPhotosHebrewScenario = async (req, res) => {
  try {
    // Update all scenarios, setting the photos array to empty
    const updateResult = await HebrewScenario.updateMany({}, { $set: { photos: [] } });
    if (updateResult.matchedCount === 0) {
      return res.status(404).send('No scenarios found to update.');
    }
    res.send({ message: 'Photos removed from all scenarios', updatedCount: updateResult.modifiedCount });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error removing photos from scenarios');
  }
};