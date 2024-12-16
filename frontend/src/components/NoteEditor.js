import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, updateNote } from '../redux/slices/notesSlice';
import { createNote, updateNote as updateNoteAPI } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import './NoteEditor.css'; // Custom CSS for NoteEditor

const NoteEditor = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const user = useSelector((state) => state.auth.user);

  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    if (noteId) {
      const note = notes.find((n) => n.note_id === noteId);
      if (note) {
        setNoteTitle(note.note_title);
        setNoteContent(note.note_content);
      }
    }
  }, [noteId, notes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrUpdatedNote = {
      note_title: noteTitle,
      note_content: noteContent,
      user_id: user.userId,
    };

    try {
      if (noteId) {
        await updateNoteAPI(noteId, newOrUpdatedNote);
        dispatch(updateNote({ ...newOrUpdatedNote, note_id: noteId }));
      } else {
        const { data } = await createNote(newOrUpdatedNote);
        dispatch(addNote(data));
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting note:', error.response?.data || error.message);
      alert('Failed to save note.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="note-editor-wrapper">
      <div className="note-editor-container">
        <h2>{noteId ? 'Edit Note' : 'Create New Note'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="note-title"
            placeholder="Enter title here..."
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            required
          />
          <textarea
            className="note-content"
            placeholder="Start typing your note here..."
            rows="15"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            required
          />
          <div className="button-row">
            <button type="submit" className="note-save-btn">
              {noteId ? 'Update Note' : 'Create Note'}
            </button>
            <button type="button" className="note-cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteEditor;
