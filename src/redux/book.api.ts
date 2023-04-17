import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksAPI = createApi({
  reducerPath: 'booksAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.itbook.store/1.0/' }),
  endpoints: (builder) => ({
    getBooks: builder.query({ query: (search: string) => `search/${search}` }),
    getBookById: builder.query({ query: (id: string) => `books/${id}` }),
  }),
});

export const { useGetBooksQuery, useLazyGetBooksQuery, useGetBookByIdQuery } = booksAPI;
