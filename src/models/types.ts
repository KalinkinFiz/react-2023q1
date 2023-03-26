export interface IBook {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export interface IForm {
  isbn13?: string;
  title: string;
  subtitle: string;
  price: string;
  date: string;
  genre: string[];
  order: string;
  binding: string;
  image: string;
}
