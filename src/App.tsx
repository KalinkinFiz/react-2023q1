import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { FormsPage } from './pages/FormsPage';
import { NotFoundPage } from './pages/NotfoundPage';

import store from './redux/store';

import './App.css';

const App: FC = () => {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="forms" element={<FormsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
