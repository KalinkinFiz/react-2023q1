import React from 'react';
import { FieldValues } from 'react-hook-form';

interface IFormCardProps {
  formData: FieldValues;
  formNumber: number;
}

const FormCard = ({ formData, formNumber }: IFormCardProps) => {
  return (
    <article>
      <div className="form-cards">
        <h3>{formNumber + 1}</h3>
        <div className="form-card-output">
          <div
            style={{
              background: `url(${formData.image}), no-repeat`,
              height: '200px',
              width: '200px',
              backgroundSize: 'cover',
            }}
          ></div>
          {/* <p>Image: {formData.image}</p> */}
          <p>Title: {formData.title}</p>
          <p>Subtitle: {formData.subtitle}</p>
          <p>Price: {formData.price} $</p>
          <p>Date: {formData.date}</p>
          <p>Genre: {formData.genre.join(', ')}</p>
          <p>Order: {formData.order}</p>
          <p>Binding: {formData.binding}</p>
        </div>
      </div>
    </article>
  );
};

export default FormCard;
