import React, { FC, useEffect, useState } from 'react';

import { IBook } from '../models/types';

import find from '../assets/img/find.png';

import { useLazyGetBooksQuery } from '../redux/book.api';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { setSearch } from '../redux/reducers';

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
  const [getBooks] = useLazyGetBooksQuery();

  const [state, setState] = useState<ISearchState>({
    search: useAppSelector((state) => state.app.search) || '',
  });

  useEffect(() => {
    return () => {
      dispatch(setSearch(String(state.search)));
    };
  }, [dispatch, state.search]);

  // useEffect(() => {
  //   if (state.search) handleSearchClick();
  // }, [state.search]);

  const handleSearchClick = async () => {
    if (!state.search) return;

    props.onBooksStartFetch?.();

    const { books } = await getBooks(state.search).unwrap();

    handleBooksFetched(books as IBook[]);
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
