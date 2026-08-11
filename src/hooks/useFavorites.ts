import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFavorites, removeFavorite } from "../services/movieService";

export function useFavorites(page: number, search: string) {
  return useQuery({
    queryKey: ["favorites", page, search],
    queryFn: () => getFavorites(page, search).then((res) => res.data),
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (movieId: number) => removeFavorite(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}