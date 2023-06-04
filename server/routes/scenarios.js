// routes/scenarios.js
const express = require('express');
const router = express.Router();
const scenariosController = require('../controllers/scenariosController');

router.post('/scenarios', scenariosController.createScenario);
router.get('/scenarios', scenariosController.getScenarios);
router.put('/scenarios/:id', scenariosController.updateScenario);
router.delete('/scenarios/:id', scenariosController.deleteScenario);
router.get('/scenarios/latest-number', scenariosController.getLatestScenarioNumber);
router.put('/scenarios/approve/:id', scenariosController.approveScenario);
router.put('/scenarios/disapprove/:id', scenariosController.disapproveScenario);

module.exports = router;
