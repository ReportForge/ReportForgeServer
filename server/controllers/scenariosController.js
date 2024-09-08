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

exports.createValidatedScenario = async (req, res) => {
  try {
    const { 
      scenarioTitle, 
      scenarioDifficulty, 
      scenarioImpact, 
      tactic, 
      description, 
      attackFlow 
    } = req.body;

    // Validate that required fields are present and of the correct type
    if (!scenarioTitle || typeof scenarioTitle !== 'string') {
      return res.status(400).send('Invalid or missing scenarioTitle');
    }
    if (!scenarioDifficulty || !['Low', 'Medium', 'Hige'].includes(scenarioDifficulty)) {
      return res.status(400).send('Invalid or missing scenarioDifficulty (allowed values: Low, Medium, Hige)');
    }
    if (!scenarioImpact || !['Low', 'Medium', 'Hige'].includes(scenarioImpact)) {
      return res.status(400).send('Invalid or missing scenarioImpact (allowed values: Low, Medium, Hige)');
    }
    if (!tactic || typeof tactic !== 'string') {
      return res.status(400).send('Invalid or missing tactic');
    }
    if (!description || typeof description !== 'string') {
      return res.status(400).send('Invalid or missing description');
    }
    if (!attackFlow || attackFlow.length === 0 || !Array.isArray(attackFlow) || !attackFlow.every(item => typeof item === 'string')) {
      return res.status(400).send('Invalid or missing attackFlow (should be a non-empty array of base64 strings)');
    }
    

    // Get the latest scenario number
    const latestScenario = await Scenario.findOne().sort({ scenarioNumber: -1 }).limit(1);
    const scenarioNumber = latestScenario ? latestScenario.scenarioNumber + 1 : 1;

    // Create new scenario object
    const scenario = new Scenario({
      scenarioNumber,
      scenarioTitle,
      scenarioDifficulty,
      scenarioImpact,
      tactic,
      description,
      attackFlow, // expecting base64 image strings in array
      photos: [], // photos can be empty
    });

    // Save the new scenario
    await scenario.save();
    
    // Respond with the created scenario
    res.status(201).send(scenario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating scenario');
  }
};

exports.getScenariosByBulletNames = async (req, res) => {
  try {
    const { bulletNames } = req.body;

    // Validate that bulletNames is an array and not empty
    if (!bulletNames || !Array.isArray(bulletNames) || bulletNames.length === 0) {
      return res.status(400).send('Invalid or missing bulletNames. It should be a non-empty array.');
    }

    // Find scenarios where the scenarioTitle is in the bulletNames array
    const foundScenarios = await Scenario.find({
      scenarioTitle: { $in: bulletNames }
    });

    // Check if any bulletNames are missing from foundScenarios
    const foundScenarioTitles = foundScenarios.map(scenario => scenario.scenarioTitle);
    const missingBulletNames = bulletNames.filter(bulletName => !foundScenarioTitles.includes(bulletName));

    // If all bulletNames have matching scenarios, return the found scenarios
    if (missingBulletNames.length === 0) {
      return res.status(200).send(foundScenarios);
    } else {
      // If some bulletNames do not have matching scenarios, return a message about the missing names
      return res.status(404).send({
        message: 'Some bullet names do not have matching scenarios',
        missingBulletNames,
        foundScenarios
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching scenarios by bullet names');
  }
};

