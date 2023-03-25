import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { FormPage } from './pages/FormPage';
import { NotFoundPage } from './pages/NotfoundPage';

import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
