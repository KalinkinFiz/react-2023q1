import React, { Dispatch, FC, SetStateAction } from 'react';

import { IBook } from '../models/types';

interface Props {
  modalIsOpen: Dispatch<SetStateAction<boolean>>;
  book: IBook;
}

const Modal: FC<Props> = ({ book, ...props }) => {
  return (
    <div className="overlay" onClick={() => props.modalIsOpen(false)}>
      <div className="modal-background">
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="title-close-btn">
            <button onClick={() => props.modalIsOpen(false)}> X </button>
          </div>
          <div className="modal-header-wrapper">
            <div className="modal-book">
              <img className="modal-img" src={book.image} alt="book image" />
              <p className="modal-price">
                <strong>{book.price}</strong>
              </p>
              <p className="modal-title">{book.title}</p>
              <p className="modal-subtitle">{book.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
