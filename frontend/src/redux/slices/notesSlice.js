import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    setNotes(state, action) {
      return action.payload;
    },
    addNote: (state, action) => {
      state.push(action.payload);
    },
    updateNote: (state, action) => {
      const index = state.findIndex((note) => note.note_id === action.payload.note_id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteNote: (state, action) => {
      return state.filter((note) => note.note_id !== action.payload);
    },
  },
});

export const { setNotes, addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
