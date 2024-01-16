export interface IBook {
  id: number;
  title: string;
  descreption: string;
  price: number;
  author_id: number;
  genre_id: number;
  created_at: Date;
  updated_at: Date;
}
