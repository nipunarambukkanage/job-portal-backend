

const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.get('/', jobController.getAllJobs);

router.get('/:id', jobController.getJobById);

router.post('/', isAdmin, jobController.createJob);

router.put('/:id', isAdmin, jobController.updateJob);

router.delete('/:id', isAdmin, jobController.deleteJob);

module.exports = router;
