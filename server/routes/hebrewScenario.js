// routes/hebrewScenarios.js
const express = require('express');
const router = express.Router();
const hebrewScenariosController = require('../controllers/hebrewScenariosController');

router.post('/hebrewScenario', hebrewScenariosController.createHebrewScenario);
router.get('/hebrewScenario', hebrewScenariosController.getHebrewScenarios);
router.put('/hebrewScenario/:id', hebrewScenariosController.updateHebrewScenario);
router.delete('/hebrewScenario/:id', hebrewScenariosController.deleteHebrewScenario);
router.get('/hebrewScenario/latest-number', hebrewScenariosController.getLatestHebrewScenarioNumber);
router.put('/hebrewScenario/approve/:id', hebrewScenariosController.approveHebrewScenario);
router.put('/hebrewScenario/disapprove/:id', hebrewScenariosController.disapproveHebrewScenario);
router.post('/hebrewScenario/removePhotos', hebrewScenariosController.removeAllPhotosHebrewScenario);

module.exports = router;
