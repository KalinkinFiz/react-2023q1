import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';

export interface ProductsState {
  search: string;
  formProducts: FieldValues[];
}

const initialState: ProductsState = {
  search: '',
  formProducts: [],
};

const appSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFormProducts: (state, action: PayloadAction<FieldValues>) => {
      state.formProducts = [...state.formProducts, action.payload];
    },
  },
});

const { actions, reducer } = appSlice;

export const { setSearch } = actions;
export default reducer;
