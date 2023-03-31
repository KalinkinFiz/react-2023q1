import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Header } from '../components/Header';

export class NotFoundPage extends Component {
  render() {
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
  }
}
