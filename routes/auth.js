const passport = require('passport');

module.exports = (app) => {
  app.post(
    '/signin',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.post('/signup', (req, res, next) => {
    User.register(
      new User({ email: req.body.email }),
      req.body.password,
      (err) => {
        if (err) {
          return next(err);
        }

        res.redirect('/');
      }
    );
  });
};
