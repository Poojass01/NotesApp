import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <AppWithHeader token={token} />
      <div className="container mt-5">
        <Routes>
          <Route path="/signin" element={!token ? <SignIn /> : <Navigate to="/" />} />
          <Route path="/signup" element={!token ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/" element={token ? <NotesList /> : <Navigate to="/signin" />} />
          <Route path="/create" element={token ? <NoteEditor /> : <Navigate to="/signin" />} />
          <Route path="/edit/:noteId" element={token ? <NoteEditor /> : <Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
};

const AppWithHeader = ({ token }) => {
  const location = useLocation();

  // Only render Header when not on /signin or /signup
  const shouldShowHeader = location.pathname !== '/signin' && location.pathname !== '/signup';

  return (
    <>
      {token && shouldShowHeader && <Header />}
    </>
  );
};

export default App;
