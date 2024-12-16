import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes, deleteNote } from '../redux/slices/notesSlice';
import { fetchNotes, deleteNote as deleteNoteAPI } from '../api';
import { useNavigate } from 'react-router-dom';

const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchNotes(user.userId)
        .then((res) => dispatch(setNotes(res.data)))
        .catch((err) => console.error(err));
    }
  }, [user, dispatch]);

  const handleDelete = (noteId) => {
    deleteNoteAPI(noteId)
      .then(() => dispatch(deleteNote(noteId)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="row">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.note_id} className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{note.note_title}</h5>
                <p className="card-text">{note.note_content.slice(0, 100)}...</p>
                <button className="btn btn-warning me-2" onClick={() => navigate(`/edit/${note.note_id}`)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(note.note_id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No notes available. Create one!</p>
      )}
      <div className="col-md-4 mb-4">
        <button className="btn btn-primary w-100" onClick={() => navigate('/create')}>Create New Note</button>
      </div>
    </div>
  );
};

export default NotesList;
