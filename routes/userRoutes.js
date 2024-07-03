// const express = require('express');
// const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
// const userController = require('../controllers/userController');

// const router = express.Router();

// router.get('/', isAdmin, userController.getAllUsers);

// router.get('/:id', userController.getUserById);

// router.put('/:id', isAuthenticated, userController.updateUser);

// router.delete('/:id', isAuthenticated, userController.deleteUser);

// module.exports = router;

const express = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const checkAdmin = require('../middleware/checkAdmin');

const router = express.Router();

router.get('/', checkAdmin, getUsers);
router.get('/:id', checkAdmin, getUserById);
router.post('/', checkAdmin, createUser);
router.put('/:id', checkAdmin, updateUser);
router.delete('/:id', checkAdmin, deleteUser);

module.exports = router;

