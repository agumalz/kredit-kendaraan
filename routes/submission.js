const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

router.get('/submit', submissionController.showSubmitForm);
router.post('/submit', submissionController.submitApplication);
router.get('/thankyou', submissionController.showThankYou);

module.exports = router; 