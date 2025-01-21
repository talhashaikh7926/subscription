import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "../src"

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(
    <BrowserRouter>  {/* Wrap your App component with BrowserRouter */}
    <App />
  </BrowserRouter>
  );
};

renderApp();
