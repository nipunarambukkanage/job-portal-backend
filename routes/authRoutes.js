const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isAuthenticated } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

const router = express.Router();


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', isAuthenticated, authController.logoutUser);

module.exports = router;
