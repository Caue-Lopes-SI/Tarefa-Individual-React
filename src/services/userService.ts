import { api } from "../api/api";
import type { MovieSummary } from "../Types/Movie";
import type { Review, PublicUser } from "../Types/Review";

interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  };
}

export function getUserProfile(userId: number) {
  return api.get<{ data: PublicUser }>(`/users/${userId}`);
}

export function getUserFavorites(userId: number, page = 1) {
  return api.get<PaginatedResponse<MovieSummary>>(`/users/${userId}/favorites`, {
    params: { page },
  });
}

export function getUserWatched(userId: number, page = 1) {
  return api.get<PaginatedResponse<MovieSummary>>(`/users/${userId}/watched`, {
    params: { page },
  });
}

export function getUserReviews(userId: number, page = 1) {
  return api.get<PaginatedResponse<Review>>(`/users/${userId}/reviews`, {
    params: { page },
  });
}