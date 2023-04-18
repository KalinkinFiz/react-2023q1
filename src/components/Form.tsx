import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { setFormBooks } from '../redux/reducers';
import { useAppDispatch } from '../redux/store';

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

const Form: FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormState>();

  const submitForm: SubmitHandler<IFormState> = (data) => {
    const { image } = data;

    const nonSerialized = image as unknown as FileList;

    const imageAsArray = [...nonSerialized];

    const serializedImage = imageAsArray.map((file) => {
      console.log(file);
      return URL.createObjectURL(file);
    })[0];
    data.image = serializedImage || '';

    dispatch(setFormBooks(data));

    alert('Form created');
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(submitForm)} className="form">
      <div className="form-submit">
        <label>
          Title of the book
          <input
            className="input-form"
            type="text"
            {...register('title', {
              required: 'title is required',
              pattern: {
                value: /[A-Z][a-z]{1,40}/,
                message:
                  'The title must start with a capital letter, and contain more than two characters',
              },
            })}
          />
          {errors.title && <span className="text-red-400"> {errors.title?.message} </span>}
        </label>
        <label>
          Description
          <input
            className="input-form"
            type="text"
            {...register('subtitle', {
              required: 'subtitle is required',
              pattern: {
                value: /[A-Z][a-z]{1,255}/,
                message: 'The description of the book should contain no more than 255 characters.',
              },
            })}
          />
          <br />
          {errors.subtitle && <span className="text-red-400"> {errors.subtitle?.message} </span>}
        </label>
        <label>
          Price
          <input
            className="input-form"
            type="text"
            {...register('price', {
              required: 'price is required',
              pattern: {
                value: /^\d+$/,
                message: 'Only numbers',
              },
            })}
          />
          <br />
          {errors.price && <span className="text-red-400"> {errors.price?.message} </span>}
        </label>
        <div>
          <label>
            Date of publication
            <input
              className="input-form"
              type="date"
              {...register('date', { required: 'Date is required' })}
            />
          </label>
        </div>
        <fieldset>
          <legend>Genre</legend>
          <label>
            <input
              className="input-form"
              {...register('genre', { required: 'Genre is required' })}
              value="cookbook"
              type="checkbox"
              data-heard="Cookbook"
            />
            Cookbook
          </label>
          <label>
            <input
              className="input-form"
              {...register('genre', { required: 'Genre is required' })}
              value="art"
              type="checkbox"
              data-heard="Art"
            />
            Art
          </label>
          <label>
            <input
              className="input-form"
              {...register('genre', { required: 'Genre is required' })}
              value="self-help"
              type="checkbox"
              data-heard="Self-help"
            />
            Self-help
          </label>
          <label>
            <input
              className="input-form"
              {...register('genre', { required: 'Genre is required' })}
              value="development"
              type="checkbox"
              data-heard="Development"
            />
            Development
          </label>
          <label>
            <input
              className="input-form"
              {...register('genre', { required: 'Genre is required' })}
              value="health"
              type="checkbox"
              data-heard="Health"
            />
            Health
          </label>
          <label>
            <input
              className="input-form"
              {...register('genre', { required: 'Genre is required' })}
              value="humor"
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
              {...register('order', { required: 'Order is required' })}
              type="radio"
              value="Can be ordered"
              data-heard="Order"
            />
            Can be ordered
          </label>
          <label>
            <input
              className="input-form"
              {...register('order', { required: 'Order is required' })}
              type="radio"
              value="Pre-order"
              data-heard="Pre-Order"
            />
            Pre-Order
          </label>
        </fieldset>
        <label>
          Book binding
          <select {...register('binding', { required: true })}>
            <option value="Hard Cover">Hard Cover</option>
            <option value="SoftBoard">SoftBoard</option>
            <option value="Adhesive Sew Bond">Adhesive Sew Bond</option>
            <option value="Integral Binding">Integral Binding</option>
          </select>
        </label>
        <input type="file" {...register('image', { required: true })} />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button className="button-submit" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
