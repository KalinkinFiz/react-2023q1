import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

export const NotFoundPage: FC = () => {
  return (
    <div>
      <Header hideSearch={true} />
      <h1>404</h1>
      <p>
        Page not found. Go{' '}
        <Link className="not-found-link" to="/">
          home
        </Link>
      </p>
    </div>
  );
};
