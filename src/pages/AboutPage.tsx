import React, { FC } from 'react';

import Header from '../components/Header';

export const AboutPage: FC = () => {
  return (
    <>
      <Header hideSearch={true} />
      <div>
        <h1>About us</h1>
        <p>Information will come later</p>
      </div>
    </>
  );
};
