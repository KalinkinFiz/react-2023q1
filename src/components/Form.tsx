import React, { FC, useState } from 'react';

export interface IFormState {
  title: string;
  subtitle: string;
  price: string;
  date: string;
  genre: string[];
  order: string;
  binding: string;
  image: string;
}

interface IFormProps {
  setForm: () => void;
}

const getDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;
};

const Form: FC<IFormProps> = (props) => {
  const [state, setState] = useState<IFormState>({
    title: '',
    subtitle: '',
    price: '',
    image: '',
    genre: [],
    order: '',
    date: getDate(),
    binding: 'Hard Cover',
  });

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const oldForms = JSON.parse(localStorage.getItem('forms') || '[]');

    const forms = [...oldForms, state];
    localStorage.setItem('forms', JSON.stringify(forms));
    alert('Form created');

    props.setForm();
    handleClickReset();
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onChangeOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      order: event.target.value,
    }));
  };

  const onChangeBinding = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => ({
      ...prevState,
      binding: event.target.value,
    }));
  };

  const onChangeGenre = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genre = new Set([...state.genre, event.target.value]);
    setState((prevState) => ({
      ...prevState,
      genre: [...genre],
    }));
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files?.[0] as Blob);

    reader.onloadend = () => {
      setState((prevState) => ({
        ...prevState,
        image: reader.result as string,
      }));
    };

    // const file = event.target.files?.[0];
    // this.setState({ image: file?.name || '' });
  };

  const handleClickReset = () => {
    setState({
      title: '',
      subtitle: '',
      price: '',
      image: '',
      genre: [],
      order: '',
      date: getDate(),
      binding: 'Hard Cover',
    });
  };

  // const handleClickDeleteAll = () => {
  //   localStorage.removeItem('forms');
  //   props.setForm();
  // };

  const hasGenreChecked = (value: string) => {
    return state.genre.findIndex((genre) => genre === value) !== -1;
  };

  return (
    <form onSubmit={(e) => submitForm(e)} className="form">
      <div className="form-submit">
        <label>
          Title of the book
          <input
            className="input-form"
            name="title"
            value={state.title}
            onInput={onChangeInput}
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
            value={state.subtitle}
            onInput={onChangeInput}
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
            value={state.price}
            onInput={onChangeInput}
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
              defaultValue={state.date}
              onInput={onChangeInput}
              type="date"
              min="1999-01-01"
              max={getDate()}
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
              onChange={onChangeGenre}
              type="checkbox"
              data-heard="Cookbook"
              checked={hasGenreChecked('cookbook')}
            />
            Cookbook
          </label>
          <label>
            <input
              className="input-form"
              name="genre"
              value="art"
              onChange={onChangeGenre}
              type="checkbox"
              data-heard="Art"
              checked={hasGenreChecked('art')}
            />
            Art
          </label>
          <label>
            <input
              className="input-form"
              name="genre"
              value="self-help"
              onChange={onChangeGenre}
              type="checkbox"
              data-heard="Self-help"
              checked={hasGenreChecked('self-help')}
            />
            Self-help
          </label>
          <label>
            <input
              className="input-form"
              name="genre"
              value="development"
              onChange={onChangeGenre}
              type="checkbox"
              data-heard="Development"
              checked={hasGenreChecked('development')}
            />
            Development
          </label>
          <label>
            <input
              className="input-form"
              name="genre"
              value="health"
              onChange={onChangeGenre}
              type="checkbox"
              data-heard="Health"
              checked={hasGenreChecked('health')}
            />
            Health
          </label>
          <label>
            <input
              className="input-form"
              name="genre"
              value="humor"
              onChange={onChangeGenre}
              type="checkbox"
              data-heard="Humor"
              checked={hasGenreChecked('humor')}
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
              checked={state.order === 'Can be ordered'}
              onChange={onChangeOrder}
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
              checked={state.order === 'Pre-order'}
              onChange={onChangeOrder}
              data-heard="Pre-Order"
            />
            Pre-Order
          </label>
        </fieldset>
        <label>
          Book binding
          <select value={state.binding} onChange={onChangeBinding}>
            <option value="Hard Cover">Hard Cover</option>
            <option value="SoftBoard">SoftBoard</option>
            <option value="Adhesive Sew Bond">Adhesive Sew Bond</option>
            <option value="Integral Binding">Integral Binding</option>
          </select>
        </label>
        <input type="file" onChange={onChangeFile} required />

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
};

export default Form;
