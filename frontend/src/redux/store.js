import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import notesReducer from './slices/notesSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});
