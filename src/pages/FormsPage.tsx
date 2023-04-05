import React, { FC, useState } from 'react';

import Header from '../components/Header';
import Form from '../components/Form';
import FormCard from '../components/FormCard';

import { IFormState } from '../components/Form';

export const FormsPage: FC = () => {
  const [cards, setCards] = useState<IFormState[]>([]);
  return (
    <>
      <Header hideSearch={true} />
      <div>
        <h1>Forms Page</h1>
        <Form
          setForm={(card) => {
            card.image = { ...card.image };
            setCards([...cards, card]);
          }}
        />
        <div>
          <p>Submited forms</p>
          <div className="form-card">
            {cards.map((form, i) => {
              return <FormCard formData={form} formNumber={i} key={i} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
