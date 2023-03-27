import React, { Component, ReactNode } from 'react';

export interface FormState {
  title: string;
  subtitle: string;
  price: string;
  date: string;
  genre: string[];
  order: string;
  binding: string;
  image: string;
}

export class Form extends Component<{ setForm: () => void }, FormState> {
  constructor(props: { setForm: () => void }) {
    super(props);

    this.state = {
      title: '',
      subtitle: '',
      price: '',
      image: '',
      genre: [],
      order: '',
      date: this.getDate(),
      binding: 'Hard Cover',
    };
  }

  getDate(): string {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }

  submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!localStorage.getItem('forms')) {
      localStorage.setItem('forms', JSON.stringify([this.state]));

      this.props.setForm();
      return;
    }

    localStorage.setItem(
      'forms',
      JSON.stringify([...JSON.parse(localStorage.getItem('forms')!), this.state])
    );
    this.props.setForm();
  }

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  onChangeOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      order: event.target.value,
    });
  };

  onChangeBinding = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      binding: event.target.value,
    });
  };

  onChangeGenre = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genre = new Set([...this.state.genre, event.target.value]);
    this.setState({ genre: [...genre] });
  };

  onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files?.[0] as Blob);

    reader.onloadend = () => {
      this.setState({ image: reader.result as string });
    };
  };

  render(): ReactNode {
    return (
      <form onSubmit={(e) => this.submitForm(e)} className="form">
        <div className="form-submit">
          <label>
            Title of the book
            <input
              className="input-form"
              name="title"
              value={this.state.title}
              onInput={this.onChangeInput}
              type="text"
              pattern="[A-Z][a-z]{1,40}"
              title="The title must start with a capital letter, and contain more than two characters."
              required
            />
          </label>
          <label>
            Description
            <input
              className="input-form"
              name="subtitle"
              value={this.state.subtitle}
              onInput={this.onChangeInput}
              type="text"
              pattern="[A-Z][a-z]{1,255}"
              title="The description of the book should contain no more than 255 characters."
              required
            />
          </label>
          <label>
            Price
            <input
              className="input-form"
              name="price"
              value={this.state.price}
              onInput={this.onChangeInput}
              type="text"
              pattern="^\d+$"
              title="Only numbers"
              required
            />
          </label>
          <div>
            <label>
              Date of publication
              <input
                className="input-form"
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
                className="input-form"
                name="genre"
                value="cookbook"
                onChange={this.onChangeGenre}
                type="checkbox"
                data-heard="Cookbook"
              />
              Cookbook
            </label>
            <label>
              <input
                className="input-form"
                name="genre"
                value="art"
                onChange={this.onChangeGenre}
                type="checkbox"
                data-heard="Art"
              />
              Art
            </label>
            <label>
              <input
                className="input-form"
                name="genre"
                value="self-help"
                onChange={this.onChangeGenre}
                type="checkbox"
                data-heard="Self-help"
              />
              Self-help
            </label>
            <label>
              <input
                className="input-form"
                name="genre"
                value="development"
                onChange={this.onChangeGenre}
                type="checkbox"
                data-heard="Development"
              />
              Development
            </label>
            <label>
              <input
                className="input-form"
                name="genre"
                value="health"
                onChange={this.onChangeGenre}
                type="checkbox"
                data-heard="Health"
              />
              Health
            </label>
            <label>
              <input
                className="input-form"
                name="genre"
                value="humor"
                onChange={this.onChangeGenre}
                type="checkbox"
                data-heard="Humor"
              />
              Humor
            </label>
          </fieldset>
          <fieldset>
            <legend>Order</legend>
            <label>
              <input
                className="input-form"
                name="order"
                type="radio"
                value="Can be ordered"
                checked={this.state.order === 'Can be ordered'}
                onChange={this.onChangeOrder}
                data-heard="Order"
              />
              Can be ordered
            </label>
            <label>
              <input
                className="input-form"
                name="order"
                type="radio"
                value="Pre-order"
                checked={this.state.order === 'Pre-order'}
                onChange={this.onChangeOrder}
                data-heard="Pre-Order"
              />
              Pre-Order
            </label>
          </fieldset>
          <label>
            Book binding
            <select value={this.state.binding} onChange={this.onChangeBinding}>
              <option value="Hard Cover">Hard Cover</option>
              <option value="SoftBoard">SoftBoard</option>
              <option value="Adhesive Sew Bond">Adhesive Sew Bond</option>
              <option value="Integral Binding">Integral Binding</option>
            </select>
          </label>
          <input type="file" onChange={this.onChangeFile} required />
          <button className="button-submit">Submit</button>
        </div>
      </form>
    );
  }
}
