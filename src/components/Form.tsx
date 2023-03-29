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

interface FormProps {
  setForm: () => void;
}

export class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
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

  genreRef = React.createRef();

  getDate(): string {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }

  submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const oldForms = JSON.parse(localStorage.getItem('forms') || '[]');

    const forms = [...oldForms, this.state];
    localStorage.setItem('forms', JSON.stringify(forms));
    alert('Form created');

    this.props.setForm();
    this.handleClickReset();
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

    // const file = event.target.files?.[0];
    // this.setState({ image: file?.name || '' });
  };

  handleClickReset = () => {
    this.setState({
      title: '',
      subtitle: '',
      price: '',
      image: '',
      genre: [],
      order: '',
      date: this.getDate(),
      binding: 'Hard Cover',
    });
  };

  handleClickDeleteAll = () => {
    localStorage.removeItem('forms');
    this.props.setForm();
  };

  hasGenreChecked = (value: string) => {
    return this.state.genre.findIndex((genre) => genre === value) !== -1;
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
                checked={this.hasGenreChecked('cookbook')}
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
                checked={this.hasGenreChecked('art')}
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
                checked={this.hasGenreChecked('self-help')}
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
                checked={this.hasGenreChecked('development')}
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
                checked={this.hasGenreChecked('health')}
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
                checked={this.hasGenreChecked('humor')}
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

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button className="button-submit">Submit</button>
            {/* <button className="button-submit" onClick={this.handleClickReset}>
              Reset
            </button>
            <button className="button-submit" onClick={this.handleClickDeleteAll}>
              Delete All Cards
            </button> */}
          </div>
        </div>
      </form>
    );
  }
}
