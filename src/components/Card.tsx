import React, { FC, useState } from 'react';

import { IBook } from '../models/types';

import views from '../assets/img/eye.png';
import like from '../assets/img/like.png';

interface ICardProps {
  book: IBook;
}

interface ICardState {
  likes: number;
  views: number;
  show: boolean;
  info: boolean;
  isLiked: boolean;
  isViewed: boolean;
}

const Card: FC<ICardProps> = ({ book }) => {
  const [state, setState] = useState<ICardState>({
    likes: 0,
    views: 0,
    show: false,
    info: false,
    isLiked: false,
    isViewed: false,
  });

  const handleLikesClick = () => {
    if (!state.isLiked) {
      setState((prevState) => ({
        ...prevState,
        likes: prevState.likes + 1,
        isLiked: !prevState.isLiked,
      }));
    }
  };

  const handleDetailsClick = () => {
    setState((prevState) => ({ ...prevState, show: !prevState.show }));
  };

  const handleInfoClick = () => {
    if (!state.isViewed) {
      setState((prevState) => ({
        ...prevState,
        views: prevState.views + 1,
        info: !prevState.info,
        isViewed: !prevState.isViewed,
      }));
      return;
    }

    setState((prevState) => ({ ...prevState, info: !prevState.info }));
  };

  return (
    <div className="card">
      <div className="card-header-wrapper">
        <div className="card-book">
          <img className="book-img" src={book.image} alt="book image" />
          <p className="book-price">
            <strong>{book.price}</strong>
          </p>
          <p className="book-title">{book.title}</p>
          <p className="book-subtitle">{state.show && book.subtitle}</p>
        </div>
        <div className="buttons-wrapper">
          <button className="btn book-details" onClick={handleDetailsClick}>
            {state.show ? 'Hide details' : 'Show details'}
          </button>
          <button className="btn book-info" onClick={handleInfoClick}>
            {state.info ? 'Hide info' : 'Show info'}
          </button>
        </div>
      </div>
      <div>
        <hr className="hr"></hr>
        <div className="card-footer-wrapper">
          <div className="likes-block">
            <img className="like-img" src={like} alt="like image" onClick={handleLikesClick} />
            <strong className="card-footer-text">{state.likes}</strong>
          </div>
          <div className="views-block">
            <img className="views-img" src={views} alt="views image" />
            <strong className="card-footer-text">{state.views}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
