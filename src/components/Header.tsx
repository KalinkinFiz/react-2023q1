import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { IBook } from '../models/types';
import SearchBar from './SearchBar';

interface IHeaderProps {
  onBooksFetched?: (books: IBook[]) => void;
  onBooksStartFetch?: () => void;
  hideSearch: boolean;
}

const Header: FC<IHeaderProps> = (props) => {
  return (
    <>
      <header className="header-main">
        <div className="header-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/form">Forms</Link>
        </div>
        {!props.hideSearch && (
          <SearchBar
            onBooksFetched={props.onBooksFetched}
            onBooksStartFetch={props.onBooksStartFetch}
          />
        )}
      </header>
    </>
  );
};

export default Header;
