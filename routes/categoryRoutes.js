const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategoryById);

router.post('/', isAdmin, categoryController.createCategory);

router.put('/:id', isAdmin, categoryController.updateCategory);

router.delete('/:id', isAdmin, categoryController.deleteCategory);

module.exports = router;
