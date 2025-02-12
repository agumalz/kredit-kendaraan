const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', dashboardController.showDashboard);
router.post('/approve', dashboardController.approveSubmission);
router.post('/reject', dashboardController.rejectSubmission);

module.exports = router; 