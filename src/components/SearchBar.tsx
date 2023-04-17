import React, { FC, useEffect, useState } from 'react';

import BooksService from '../services/book.service';
import { IBook } from '../models/types';

import { useAppSelector, useAppDispatch } from '../redux/store';
import { setSearch } from '../redux/reducers';

import find from '../assets/img/find.png';

export interface ISearchBarProps {
  onBooksFetched?: (books: IBook[]) => void;
  onBooksStartFetch?: () => void;
  hideSearch?: boolean;
}

interface ISearchState {
  search: string;
}

const SearchBar: FC<ISearchBarProps> = (props) => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState<ISearchState>({
    search: useAppSelector((state) => state.search) || '',
  });

  const booksService = new BooksService();

  useEffect(() => {
    return () => {
      dispatch(setSearch(String(state.search)));
    };
  }, [dispatch, state.search]);

  const handleSearchClick = () => {
    if (!state.search) return;

    props.onBooksStartFetch?.();

    if (typeof Number(state.search) === 'number' && state.search.length === 13) {
      booksService.getBook(state.search).then((book) => handleBooksFetched([book]));
    } else {
      booksService.getBooks(state.search).then((books) => handleBooksFetched(books));
    }
  };

  const handleBooksFetched = (books: IBook[]) => {
    if (props.onBooksFetched) props.onBooksFetched(books);
  };

  return (
    <div className="search">
      <div className="search-bar">
        <img className="search-img" src={find} alt="find" />
        <input
          type="search"
          value={state.search || ''}
          onChange={(e) => setState({ search: e.target.value })}
        />
      </div>
      <button className="btn" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
