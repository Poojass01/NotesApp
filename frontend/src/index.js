import React from 'react';
import ReactDOM from 'react-dom/client';  // Import the createRoot function
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';  // Import your Redux store

// Create a root element and render the app inside it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {/* Wrap your App with the Redux Provider */}
    <App />
  </Provider>
);
