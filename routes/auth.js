const passport = require('passport');
const User = require('../models/User');

module.exports = (app) => {
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.post('/api/signin', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
  });

  app.post('/api/signup', (req, res, next) => {
    User.register(
      new User({ email: req.body.email, name: req.body.name }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.send(err);
        }

        User.authenticate(req.body.email, req.body.password, (err, result) => {
          if (err) {
            res.send(err);
          }
          console.log(result);
          res.send(result);
        });
      }
    );
  });
};
