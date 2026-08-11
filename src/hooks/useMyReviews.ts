import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyReviews, deleteReview, createOrUpdateReview } from "../services/reviewService";
import type { CreateReviewRequest } from "../Types/Review";

export function useMyReviews(page = 1) {
  return useQuery({
    queryKey: ["myReviews", page],
    queryFn: () => getMyReviews(page).then((res) => res.data),
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewRequest) => createOrUpdateReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
    },
  });
}