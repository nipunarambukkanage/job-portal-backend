const User = require('../models/User');

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error in getting users:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.getUserById = async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error in getting user by ID:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.updateUser = async (req, res) => {
//   const userId = req.params.id;
//   const { name, contactInformation, resume } = req.body;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { name, contactInformation, resume },
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'User updated successfully', user: updatedUser });
//   } catch (error) {
//     console.error('Error in updating user:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const deletedUser = await User.findOneAndDelete({ _id: userId });

//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
//   } catch (error) {
//     console.error('Error in deleting user:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


// controllers/userController.js
const mongoose = require('mongoose');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getting users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getting user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const newUser = new User({ name, email, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error in creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error in updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error in deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
