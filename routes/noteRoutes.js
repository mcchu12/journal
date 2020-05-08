const router = require('express').Router();
const Note = require('../models/Note');
const User = require('../models/User');
const requireLogin = require('../middlewares/requireLogin');

router.post('/add-note', requireLogin, async (req, res) => {
  console.log(req.body);
  const { title, content } = req.body;

  const note = new Note({
    title,
    content,
    author: req.user._id,
    lastEdited: Date.now(),
  });

  await note.save();

  res.send(note);
});

router.get('/get-notes', requireLogin, async (req, res, next) => {
  const notes = await Note.find({ author: req.user._id });

  res.send(notes);
});

module.exports = router;
