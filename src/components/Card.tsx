import React, { FC, useState } from 'react';

import { IBook } from '../models/types';
import Modal from './Modal';

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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOnClick = async () => {
    setModalIsOpen(true);
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

  const handleLikesClick = () => {
    if (!state.isLiked) {
      setState((prevState) => ({
        ...prevState,
        likes: prevState.likes + 1,
        isLiked: !prevState.isLiked,
      }));
    }
  };

  return (
    <>
      {modalIsOpen && <Modal modalIsOpen={setModalIsOpen} book={book} />}
      <div className="card">
        <div className="card-header-wrapper" onClick={handleOnClick}>
          <div className="card-book">
            <img className="book-img" src={book.image} alt="book image" />
            <p className="book-price">
              <strong>{book.price}</strong>
            </p>
            <p className="book-title">{book.title}</p>
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
    </>
  );
};

export default Card;
