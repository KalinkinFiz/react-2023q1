import React from 'react';

import { IForm } from '../models/types';

interface IFormCardProps {
  formData: IForm;
  formNumber: number;
}

export const FormCard = ({ formData, formNumber }: IFormCardProps) => {
  return (
    <article>
      <div>
        <h3>{formNumber + 1}</h3>
        <div>
          <div style={{ backgroundImage: `url(${formData.image})` }}></div>
          <p>Title: {formData.title}</p>
          <p>Subtitle: {formData.subtitle}</p>
          <p>Price: {formData.price}</p>
          <p>Date: {formData.date}</p>
          <p>Genre: {formData.genre}</p>
          <p>Order: {formData.order}</p>
          <p>Binding: {formData.binding}</p>
          {/* <p>Image: {formData.image}</p> */}
          {/* <p>Heard from: {formData.heard.join(', ')}</p> */}
        </div>
      </div>
    </article>
  );
};
