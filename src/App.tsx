import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { FormsPage } from './pages/FormsPage';
import { NotFoundPage } from './pages/NotfoundPage';

import './App.css';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="form" element={<FormsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
