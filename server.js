const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const configureExpress = require('./config/express');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');

const app = configureExpress();

connectDB();

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware for sessions
app.use(
  session({
    secret: 'selcret-key-nipuna1',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware to check JWT
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', checkJwt, categoryRoutes);
app.use('/api/jobs', jobRoutes); // You can add checkJwt here if required
app.use('/api/users', checkJwt, userRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
