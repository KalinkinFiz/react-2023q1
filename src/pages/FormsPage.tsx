import React, { FC } from 'react';

import Header from '../components/Header';
import Form from '../components/Form';
import FormCard from '../components/FormCard';

import { useAppSelector } from '../redux/store';

export const FormsPage: FC = () => {
  const formBooks = useAppSelector((state) => state.app.formBooks);

  return (
    <>
      <Header hideSearch={true} />
      <div>
        <h1>Forms Page</h1>
        <Form />
        <div>
          <p>Submited forms</p>
          <div className="form-card">
            {formBooks.map((form, i) => {
              return <FormCard formData={form} formNumber={i} key={i} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
