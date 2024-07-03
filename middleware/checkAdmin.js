// middleware/checkAdmin.js
module.exports = (req, res, next) => {
  const roles = req.user['https://your-domain.com/roles'];
  if (roles && roles.includes('admin')) {
    next();
  } else {
    res.status(403).send('Access denied');
  }
};
