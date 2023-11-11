const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { firstName,
    lastName,
    jobTitle,
    organization,
    country,
    userFunction,
    email,
    password} = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      jobTitle,
      organization,
      country,
      userFunction,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in user registration:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error in user login:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Error in user login:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

exports.logoutUser = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
};
