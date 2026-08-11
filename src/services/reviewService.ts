import { api } from "../api/api";
import type { CreateReviewRequest, Review } from "../Types/Review";


interface PaginatedResponse<T> {
    data: T[];
    metadata: {
        total:number;
        perPage:number;
        currentPage:number;
        lastPage: number;
    }
}

export function getReviewsByMovie(movieId: number, page = 1){
    return api.get<PaginatedResponse<Review>>("/reviews", {
        params: {movieId,page}
    })
}

export function createOrUpdateReview(data: CreateReviewRequest){
    return api.post<{data: Review}>("/reviews", data)
}

export function deleteReview(reviewId: number) {
    return api.delete(`/reviews/${reviewId}`)
}

export function getRandomReviews(count = 5) {
  return api.get<{ data: Review[] }>("/reviews/random", {
    params: { count },
  });
}

export function getMyReviews(page = 1, perPage = 20) {
  return api.get<PaginatedResponse<Review>>("/account/reviews", {
    params: { page, perPage },
  });
}