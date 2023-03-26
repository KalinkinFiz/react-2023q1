import React, { Component, ReactNode } from 'react';

export interface FormState {
  isbn13?: string;
  title: string;
  subtitle: string;
  price: string;
  date: string;
  genre: string[];
  order: string;
  binding: string;
  image: string;
  radioValue: string;
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
      date: '',
      binding: '',
      radioValue: '',
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
      radioValue: event.target.value,
    });
  };

  onChangeGenre = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genre = new Set([...this.state.genre, event.target.value]);
    this.setState({ genre: [...genre] });
  };

  onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const url = reader.readAsDataURL(event.target.files?.[0] as Blob);

    reader.onloadend = (_e) => {
      this.setState({ image: reader.result as string });
    };
    console.log(url); // Would see a path?
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
              pattern="[A-Z][a-z]{1,40}"
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
              pattern="[A-Z][a-z]{1,255}"
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
              pattern="^\d+$"
              title="Only numbers"
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
                value="cookbook"
                onChange={this.onChangeGenre}
                type="checkbox"
                data-heard="Cookbook"
              />
              Cookbook
            </label>
            <label>
              <input
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
                name="genre"
                value="humor"
                onChange={this.onChangeGenre}
                type="checkbox"
                data-heard="Humor"
              />
              Humor
            </label>
          </fieldset>
          <input type="file" onChange={this.onChangeFile} required />
          <button>Submit</button>
        </div>
      </form>
    );
  }
}
