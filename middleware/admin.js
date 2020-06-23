module.exports = function (req, res, next) {
  // Check if user has admin privileges 
  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  next();
}
