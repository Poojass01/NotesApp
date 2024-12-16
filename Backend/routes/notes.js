const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/notesController');

const router = express.Router();

router.get('/:userId', getNotes);
router.post('/', createNote);
router.put('/:noteId', updateNote);
router.delete('/:noteId', deleteNote);

module.exports = router;
