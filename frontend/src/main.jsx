import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App.jsx';
import Vote from './pages/Vote.jsx';
import Results from './pages/Results.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/" element={<Vote />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </App>
  </BrowserRouter>
);
