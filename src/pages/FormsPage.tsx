import React, { FC, useState } from 'react';

import Header from '../components/Header';
import Form from '../components/Form';
import FormCard from '../components/FormCard';

import { IForm } from '../models/types';

interface IFormState {
  forms: IForm[];
}

export const FormsPage: FC = () => {
  const forms = localStorage.getItem('forms') || '[]';

  const [state, setState] = useState<IFormState>({
    forms: JSON.parse(forms),
  });

  const setForm = () => {
    const forms = localStorage.getItem('forms');
    forms && setState({ forms: JSON.parse(forms) });
  };

  return (
    <>
      <Header hideSearch={true} />
      <div>
        <h1>Forms Page</h1>
        <Form setForm={setForm} />
        <div>
          <p>Submited forms</p>
          <div className="form-card">
            {state.forms.map((form, i) => {
              return <FormCard formData={form} formNumber={i} key={i} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
