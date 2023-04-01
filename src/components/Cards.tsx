import React, { FC } from 'react';

import { IBook } from '../models/types';
import { Card } from './Card';

interface IProps {
  books: IBook[];
}

export const Cards: FC<IProps> = ({ books }) => {
  return (
    <div className="cards">
      {books.map((book) => {
        return <Card book={book} key={book.isbn13} />;
      })}
    </div>
  );
};
