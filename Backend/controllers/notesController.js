const db = require('../db');
const { v4: uuidv4 } = require('uuid');

exports.getNotes = (req, res) => {
    const { userId } = req.params;
    const sql = 'SELECT * FROM notes WHERE user_id = ?';

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch notes' });
        res.json(results);
    });
};

exports.createNote = (req, res) => {
    const { note_title, note_content, user_id } = req.body;
    const noteId = uuidv4();

    const sql = `
        INSERT INTO notes (note_id, note_title, note_content, user_id, create_on, last_update)
        VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

    db.query(sql, [noteId, note_title, note_content, user_id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to create note' });
        res.status(201).json({ message: 'Note created successfully', note_id: noteId });
    });
};

exports.updateNote = (req, res) => {
    const { noteId } = req.params;
    const { note_title, note_content } = req.body;

    const sql = `
        UPDATE notes
        SET note_title = ?, note_content = ?, last_update = NOW()
        WHERE note_id = ?
    `;

    db.query(sql, [note_title, note_content, noteId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update note' });
        res.json({ message: 'Note updated successfully' });
    });
};

exports.deleteNote = (req, res) => {
    const { noteId } = req.params;

    const sql = 'DELETE FROM notes WHERE note_id = ?';
    db.query(sql, [noteId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete note' });
        res.json({ message: 'Note deleted successfully' });
    });
};
