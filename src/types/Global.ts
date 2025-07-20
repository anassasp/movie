export type Movie = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  backdrop_path?: string;
  adult?: boolean;
  genres: MovieGenre[];
};

export type MovieGenre = {
  name: string;
  id: number;
};

export type CategorizedMovieProps =
  | "now_playing"
  | "popular"
  | "top_rated"
  | "upcoming";
