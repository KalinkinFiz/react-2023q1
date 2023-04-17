import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFormState } from '../components/Form';

export interface ProductsState {
  search: string;
  formBooks: IFormState[];
}

const initialState: ProductsState = {
  search: '',
  formBooks: [],
};

const appSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFormBooks: (state, action: PayloadAction<IFormState>) => {
      state.formBooks = [...state.formBooks, action.payload];
    },
  },
});

const { actions, reducer } = appSlice;

export const { setSearch, setFormBooks } = actions;
export default reducer;
