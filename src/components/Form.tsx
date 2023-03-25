import React, { Component, ReactNode } from 'react';

interface FormState {
  isbn13?: string;
  title: string;
  subtitle: string;
  price: string;
  date: string;
  genre: string;
  order: string;
  binding: string;
  image: string;
  value: string;
}

export class Form extends Component<{ setForm: () => void }, FormState> {
  constructor(props: { setForm: () => void }) {
    super(props);

    this.state = {
      title: '',
      subtitle: '',
      price: '',
      image: '',
      genre: '',
      order: '',
      date: '',
      binding: '',
      value: '',
    };
  }

  getDate(): string {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }

  submitForm(event: React.FormEvent) {
    event.preventDefault();
    if (!localStorage.forms) {
      localStorage.setItem('forms', JSON.stringify([this.state]));
      this.props.setForm();
      return;
    }

    localStorage.forms = JSON.stringify([...JSON.parse(localStorage.forms), this.state]);
    this.props.setForm();
  }

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
  };

  render(): ReactNode {
    return (
      <form onSubmit={(e) => this.submitForm(e)} className="form">
        <div>
          <label>
            Title of the book
            <input
              name="title"
              value={this.state.title}
              onInput={this.onChangeInput}
              type="text"
              pattern="[A-Z\u0410-\u042f]{1}[a-z\u0430-\u044f]+{1,}"
              title="The title must start with a capital letter, and contain more than two characters."
              required
            />
          </label>
          <label>
            Description
            <input
              name="subtitle"
              value={this.state.subtitle}
              onInput={this.onChangeInput}
              type="text"
              pattern="[A-Z\u0410-\u042f]{1}[a-z\u0430-\u044f]+{1,}"
              title="The description of the book should contain no more than 255 characters."
              required
            />
          </label>
          <label>
            Price
            <input
              name="price"
              value={this.state.price}
              onInput={this.onChangeInput}
              type="text"
              pattern="[A-Z\u0410-\u042f]{1}[a-z\u0430-\u044f]+{1,}"
              title=""
              required
            />
          </label>
          <div>
            <label>
              Date of publication
              <input
                name="date"
                defaultValue={this.state.date}
                onInput={this.onChangeInput}
                type="date"
                min="1999-01-01"
                max={this.getDate()}
                required
              />
            </label>
          </div>
          <fieldset>
            <legend>Genre</legend>
            <label>
              <input
                name="genre"
                onChange={this.onChangeInput}
                type="checkbox"
                data-heard="Cookbook"
              />
              Cookbook
            </label>
            <label>
              <input name="genre" onChange={this.onChangeInput} type="checkbox" data-heard="Art" />
              Art
            </label>
            <label>
              <input
                name="genre"
                onChange={this.onChangeInput}
                type="checkbox"
                data-heard="Self-help"
              />
              Self-help
            </label>
            <label>
              <input
                name="genre"
                onChange={this.onChangeInput}
                type="checkbox"
                data-heard="Development"
              />
              Development
            </label>
            <label>
              <input
                name="genre"
                onChange={this.onChangeInput}
                type="checkbox"
                data-heard="Health"
              />
              Health
            </label>
            <label>
              <input name="genre" type="checkbox" data-heard="Humor" />
              Humor
            </label>
          </fieldset>
          <fieldset>
            <legend>Order</legend>
            <label>
              <input
                name="order"
                type="radio"
                value="order"
                checked={this.state.value === 'order'}
                onChange={this.onChangeHandler}
                data-heard="Order"
              />
              Order
            </label>
            <label>
              <input
                name="pre-order"
                type="radio"
                value="pre-order"
                checked={this.state.value === 'pre-order'}
                onChange={this.onChangeHandler}
                data-heard="Pre-Order"
              />
              Pre-Order
            </label>
          </fieldset>
          <input type="file" required />
          <button>Submit</button>
        </div>
      </form>
    );
  }
}
