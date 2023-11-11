
const isAuthenticated = (req, res, next) => {
   
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
  };
  
  const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden - Admins only' });
  };
  
  module.exports = { isAuthenticated, isAdmin };
  