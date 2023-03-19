import React, { Component } from 'react';

import Header from '../components/Header';

class AboutPage extends Component {
  render() {
    return (
      <>
        <Header hideSearch={true} />
        <div>
          <h1>About us</h1>
          <p>Information will come later</p>
        </div>
      </>
    );
  }
}

export default AboutPage;
