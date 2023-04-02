import React, { FC } from 'react';

import { IBook } from '../models/types';
import Card from './Card';

interface ICardsProps {
  books: IBook[];
}

const Cards: FC<ICardsProps> = ({ books }) => {
  return (
    <div className="cards">
      {books.map((book) => {
        return <Card book={book} key={book.isbn13} />;
      })}
    </div>
  );
};

export default Cards;
