import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWatched, unmarkAsWatched } from "../services/movieService";

export function useWatched(page: number, search: string) {
  return useQuery({
    queryKey: ["watched", page, search],
    queryFn: () => getWatched(page, search).then((res) => res.data),
  });
}

export function useUnmarkWatched() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (movieId: number) => unmarkAsWatched(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watched"] });
    },
  });
}