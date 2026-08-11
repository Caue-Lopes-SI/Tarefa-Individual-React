import { useQuery } from "@tanstack/react-query";
import { getGenres, getMoviesByGenres } from "../services/movieService";
import { getRandomReviews } from "../services/reviewService";

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres().then((res) => res.data.data),
  });
}

export function useMoviesByGenre(genreId: number, perPage = 20) {
  return useQuery({
    queryKey: ["movies", "genre", genreId, perPage],
    queryFn: () => getMoviesByGenres([genreId], perPage).then((res) => res.data.data),
  });
}

export function useRandomReviews(count = 5) {
  return useQuery({
    queryKey: ["reviews", "random", count],
    queryFn: () => getRandomReviews(count).then((res) => res.data.data),
  });
}