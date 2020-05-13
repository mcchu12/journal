const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).send(info);
    } else {
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        res.send(req.user);
      });
    }
  })(req, res, next);
});

router.post('/signup', (req, res) => {
  User.register(
    new User({ email: req.body.email, name: req.body.name }),
    req.body.password,
    (err) => {
      if (err) {
        res.status(500).send(err);
      }

      // Authenticate user
      passport.authenticate('local')(req, res, () => {
        res.send(req.user);
      });
    }
  );
});

router.get('/signout', (req, res) => {
  req.logout(); // Kill cookie
  res.status(200).end();
});

module.exports = router;
