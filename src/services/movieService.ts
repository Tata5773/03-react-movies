import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(query: string, page = 1): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error("Missing VITE_TMDB_TOKEN");
  }

  const response = await axios.get<MovieResponse>(API_URL, {
    params: {
      query,
      page,
      include_adult: false,
      language: "uk-UA",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.results;
}
