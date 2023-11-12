const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});


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

    //console.log("hashedPassword******", hashedPassword);

    const newUser = new User({
      firstName,
      lastName,
      jobTitle,
      organization,
      country,
      userFunction,
      email,
      password: hashedPassword,
      //password
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

    const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });

    req.logIn(user, (err) => {
      if (err) {
        console.error('Error in user login:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      console.log("token************", token);
      return res.status(200).json({ message: 'Login successful', user, token});
    });
  })(req, res, next);
};

exports.logoutUser = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
};
