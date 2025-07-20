import axios from "axios";
import type { CategorizedMovieProps, Movie } from "../types/Global";

type SearchMovieResult = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: "YOUR_TMDB_API_KEY",
    language: "en-US",
  },
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
});

export const fetchCategorizedMovies = async (
  type: CategorizedMovieProps,
  page?: number,
) => {
  const res = await api.get(`/movie/${type}`, { params: { page } });
  return res.data;
};

export const fetchMovieById = async (id: string) => {
  const res = await api.get(`/movie/${id}`);
  return res.data;
};

export const searchMovies = async (query: string, page: number) => {
  const res = await api.get("/search/movie", {
    params: { query, page, include_adult: true },
  });
  const result: SearchMovieResult = res.data;
  return result;
};

export const discoverMovie = async (sortBy: string, page?: number) => {
  const res = await api.get("/discover/movie", {
    params: { sort_by: sortBy, page },
  });
  return res.data;
};

export const fetchTrendingMovie = async () => {
  const res = await api.get("/trending/movie/day");
  return res.data.results?.slice(0, 5);
};

export const fetchMovieCredits = async (movieId: string) => {
  const res = await api.get(`movie/${movieId}/credits`);
  return res.data;
};

export const fetchMovieVideos = async (movieId: string) => {
  const res = await api.get(`movie/${movieId}/videos`);
  return res.data.results;
};
