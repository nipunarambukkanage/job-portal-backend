const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', isAdmin, userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', isAuthenticated, userController.updateUser);

router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;
