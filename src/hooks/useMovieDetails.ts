import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMovieById, addFavorite, removeFavorite, markAsWatched, unmarkAsWatched } from "../services/movieService";
import { getReviewsByMovie, createOrUpdateReview } from "../services/reviewService";
import type { CreateReviewRequest } from "../Types/Review";

export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId).then((res) => res.data.data),
  });
}

export function useMovieReviews(movieId: number, page = 1) {
  return useQuery({
    queryKey: ["reviews", movieId, page],
    queryFn: () => getReviewsByMovie(movieId, page).then((res) => res.data),
  });
}

export function useToggleFavorite(movieId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (isFavorite: boolean) =>
      isFavorite ? removeFavorite(movieId) : addFavorite(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movie", movieId] });
    },
  });
}

export function useToggleWatched(movieId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (isWatched: boolean) =>
      isWatched ? unmarkAsWatched(movieId) : markAsWatched(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movie", movieId] });
    },
  });
}

export function useCreateReview(movieId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewRequest) => createOrUpdateReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieId] });
      queryClient.invalidateQueries({ queryKey: ["movie", movieId] }); // atualiza avgRating/reviewCount
    },
  });
}