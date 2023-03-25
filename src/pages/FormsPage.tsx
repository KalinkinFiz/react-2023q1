import React, { Component } from 'react';

import { Header } from '../components/Header';
import { Form } from '../components/Form';
import { FormCard } from '../components/FormCard';

import { IForm } from '../models/types';

export class FormsPage extends Component<Record<string, never>, { forms: IForm[] }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      forms: JSON.parse(localStorage.forms || '[]'),
    };
    this.setForm = this.setForm.bind(this);
  }

  setForm() {
    this.setState({ forms: JSON.parse(localStorage.forms) });
  }

  render() {
    return (
      <>
        <Header hideSearch={true} />
        <div>
          <h1>Forms Page</h1>
          <Form setForm={this.setForm} />
          <div>
            <p>Submited forms</p>
            <div>
              {this.state.forms.map((form, i) => {
                return <FormCard formData={form} formNumber={i} key={form.isbn13} />;
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
