import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import './Header.css'; // Import CSS for Header

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="header-navbar navbar-expand-lg navbar-light bg-light header-container">
      <div className="header-container">
        <a className="header-navbar-brand" href="/">Notes App</a>
        <button onClick={handleLogout} className="header-btn header-btn-danger">Logout</button>
      </div>
    </nav>
  );
};

export default Header;
