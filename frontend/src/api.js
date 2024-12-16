import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const signUp = (userData) => API.post('/auth/signup', userData);
export const signIn = (userData) => API.post('/auth/signin', userData);

export const fetchNotes = (userId) => API.get(`/notes/${userId}`);
export const createNote = (noteData) => API.post('/notes', noteData);
export const updateNote = (noteId, noteData) => API.put(`/notes/${noteId}`, noteData);
export const deleteNote = (noteId) => API.delete(`/notes/${noteId}`);
