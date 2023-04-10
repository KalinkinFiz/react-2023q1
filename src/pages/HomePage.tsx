import React, { FC, useState } from 'react';

import Header from '../components/Header';
import Cards from '../components/Cards';
import { ProgressBar } from '../components/ProgressBar';

import { IBook } from '../models/types';
import { books } from '../data/data';

interface IHomePageProps {
  books: IBook[];
  loading: boolean;
}

export const HomePage: FC = () => {
  const [state, setState] = useState<IHomePageProps>({
    books: books,
    loading: false,
  });

  const handleBooksStartFetch = () => {
    setState((prevState) => ({ ...prevState, loading: true }));
  };

  const handleBooksFetched = (books: IBook[]) => {
    setState({ books, loading: false });
  };

  return (
    <>
      <Header
        onBooksFetched={handleBooksFetched}
        onBooksStartFetch={handleBooksStartFetch}
        hideSearch={false}
      />
      <div>
        <h1>Home Page</h1>
      </div>

      {state.loading ? <ProgressBar /> : <Cards books={state.books} />}
      {!state.loading && state.books.length === 0 && <p>No content</p>}
    </>
  );
};
