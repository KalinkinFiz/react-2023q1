import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import appReducer from './reducers';
import { booksAPI } from './book.api';

const store = configureStore({
  reducer: {
    app: appReducer,
    [booksAPI.reducerPath]: booksAPI.reducer,
  },
  middleware: (gDM) => gDM().concat([booksAPI.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
