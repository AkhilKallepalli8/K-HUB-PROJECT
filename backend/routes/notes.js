const express = require('express');
const Note = require('../models/Note');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const { content } = req.body;

    const note = new Note({
        userId: req.user.id,
        content
    });

    await note.save();

    res.status(201).send(note);
});

router.get('/', authMiddleware, async (req, res) => {
    const notes = await Note.find({ userId: req.user.id });

    res.status(200).send(notes);
});

module.exports = router;
