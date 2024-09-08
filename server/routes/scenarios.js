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
router.post('/scenarios/removePhotos', scenariosController.removeAllPhotos);
router.post('/scenarios/validated', scenariosController.createValidatedScenario);
router.post('/scenarios/by-bullet-names', scenariosController.getScenariosByBulletNames);

module.exports = router;
