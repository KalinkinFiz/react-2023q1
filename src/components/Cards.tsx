import React, { Component } from 'react';

import { IBook } from '../models/types';
import Card from './Card';

class Cards extends Component<{ books: IBook[] }> {
  render() {
    return (
      <div className="cards">
        {this.props.books.map((book) => {
          return <Card book={book} key={book.isbn13} />;
        })}
      </div>
    );
  }
}

export default Cards;
