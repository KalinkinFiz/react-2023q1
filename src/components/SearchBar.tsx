import React, { Component } from 'react';

import BooksService from '../services/book.service';
import { IBook } from '../models/types';

import find from '../assets/find.png';

export interface SearchBarProps {
  onBooksFetched?: (books: IBook[]) => void;
  hideSearch?: boolean;
}

class SearchBar extends Component<SearchBarProps, { search: string | null }> {
  booksService = new BooksService();

  constructor(props: SearchBarProps) {
    super(props);
    this.state = { search: localStorage.getItem('search') };
  }

  componentWillUnmount(): void {
    localStorage.setItem('search', String(this.state.search));
  }

  handleSearchClick = () => {
    if (!this.state.search) return;

    if (typeof Number(this.state.search) === 'number' && this.state.search.length === 13) {
      this.booksService.getBook(this.state.search).then((book) => this.handleBooksFetched([book]));
    } else {
      this.booksService.getBooks(this.state.search).then((books) => this.handleBooksFetched(books));
    }
  };

  handleBooksFetched(books: IBook[]) {
    console.log(books);
    if (this.props.onBooksFetched) this.props.onBooksFetched(books);
  }

  render() {
    return (
      <div className="search">
        <div className="search-bar">
          <img className="search-img" src={find} alt="find" />
          <input
            type="search"
            value={this.state.search || ''}
            onChange={(e) => this.setState({ search: e.target.value })}
          />
        </div>
        <button className="btn" onClick={this.handleSearchClick}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;