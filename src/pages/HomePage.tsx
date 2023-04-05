import React, { FC, useState } from 'react';

import Header from '../components/Header';
import Cards from '../components/Cards';

import { IBook } from '../models/types';
import { books } from '../data/data';

interface IHomePageProps {
  books: IBook[];
}

export const HomePage: FC = () => {
  const [state, setState] = useState<IHomePageProps>({
    books: books,
  });

  const handleBooksFetched = (books: IBook[]) => {
    setState({ books: books });
  };

  return (
    <>
      <Header onBooksFetched={handleBooksFetched} hideSearch={false} />
      <div>
        <h1>Home Page</h1>
      </div>
      <Cards books={state.books} />
    </>
  );
};
