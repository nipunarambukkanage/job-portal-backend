const mongoose = require('mongoose');
const Category = require('../models/Category');

//TODO : Add search calls with these functionalities : filtering, grouping, search, sorting, tags, search by location
exports.getAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'name', order = 'asc', search = '' } = req.query;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { created_by: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const categories = await Category.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Category.countDocuments(query);

    res.status(200).json({ categories, total });
  } catch (error) {
    console.error('Error in getting categories:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error in getting category by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error('Error in creating category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    console.error('Error in updating category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findOneAndDelete({ _id: categoryId });

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully', category: deletedCategory });
  } catch (error) {
    console.error('Error in deleting category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
