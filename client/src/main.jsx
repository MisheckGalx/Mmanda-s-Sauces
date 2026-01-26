import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AdminPanel from './AdminPanel.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main Store - Public Route */}
        <Route path="/" element={<App />} />
        
        {/* Admin Panel - Protected Route */}
        <Route path="/admin" element={<AdminPanel />} />
        
        {/* 404 Not Found - Optional */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Page not found</p>
              <a href="/" className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600">
                Go Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
