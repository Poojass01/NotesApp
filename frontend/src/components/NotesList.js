import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes, deleteNote } from '../redux/slices/notesSlice';
import { fetchNotes, deleteNote as deleteNoteAPI } from '../api';
import { useNavigate } from 'react-router-dom';
import './NotesList.css';

const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchNotes(user.userId)
        .then((res) => dispatch(setNotes(res.data)))
        .catch((err) => console.error('Error fetching notes:', err));
    }
  }, [user, dispatch]);

  const handleDelete = (noteId) => {
    deleteNoteAPI(noteId)
      .then(() => dispatch(deleteNote(noteId)))
      .catch((err) => console.error('Error deleting note:', err));
  };

  return (
    <div className="notelist-wrapper">
      <div className="notelist-header">
        <h2>Your Notes</h2>
        <button
          className="notelist-btn-small"
          onClick={() => navigate('/create')}
        >
          Create New Note
        </button>
      </div>
      <div className="notelist-container">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.note_id} className="notelist-card">
              <h5>{note.note_title || 'Untitled'}</h5>
              <p>{note.note_content ? note.note_content.slice(0, 100) : 'No content'}</p>
              <button onClick={() => navigate(`/edit/${note.note_id}`)}>Edit</button>
              <button onClick={() => handleDelete(note.note_id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No notes available.</p>
        )}
      </div>
    </div>
  );
  
};

export default NotesList;
