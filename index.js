const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize app
const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

// Connect mongoose
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure passport
app.use(passport.initialize());
app.use(passport.session());

require('./services/authStrategy')(passport);

// Routes
app.use('/api', authRoutes);
app.use('/api', noteRoutes);

// Serve static files for react app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // Express will serve up index.html
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
