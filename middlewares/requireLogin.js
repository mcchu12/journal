module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401)({ message: 'You must login in!' });
  }

  next();
};
