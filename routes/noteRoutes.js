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

router.put('/save-note/:id', requireLogin, async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: title,
        content: content,
      },
      $currentDate: {
        lastEdited: true,
      },
    },
    { new: true, useFindAndModify: false }
  );

  res.status(200).send(note);
});

router.get('/get-notes', requireLogin, async (req, res) => {
  const notes = await Note.find({ author: req.user._id });

  res.status(200).send(notes);
});

router.delete('/delete-note/:id', requireLogin, async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  console.log(note);

  res.status(200).send(note._id);
});

module.exports = router;
