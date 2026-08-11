import { api } from "../api/api";
import type { MovieSummary, MovieDetail, Genre } from "../Types/Movie";

interface PaginatedResponse<T> {
    data: T[];
    metadata: {
        total: number;
        perPage: number;
        currentPage: number;
        lastPage: number;
    }
}


export function getFeaturedMovies(){
    return api.get<{ data: MovieSummary[] }>("/movies/featured");
}


export function getMoviesByGenres(genreIds: number[] = [], perPage = 20) {
  return api.get<PaginatedResponse<MovieSummary>>("/movies", {
    params: genreIds.length > 0
      ? { "genreIds[]": genreIds, perPage }
      : { perPage },
  });
}

export function getMovieById(id:number){
    return api.get<{ data :MovieDetail}>(`/movies/${id}`);
}

export function getGenres(){
    return api.get<{data: Genre[]}>('/genres')
}

export function addFavorite(movieId: number){
    return api.post("/account/favorites", {movieId})
}

export function removeFavorite(movieId: number){
    return api.delete(`/account/favorites/${movieId}`)
}

export function unmarkAsWatched(movieId: number){
    return api.delete(`/account/watched/${movieId}`)
}

export function markAsWatched(movieId: number){
    return api.post("/account/watched/", {movieId})
}

export function getFavorites(page = 1, search = "", perPage = 20) {
  return api.get<PaginatedResponse<MovieSummary>>("/account/favorites", {
    params: { page, perPage, search },
  });
}

export function getWatched(page = 1, search = "", perPage = 20) {
  return api.get<PaginatedResponse<MovieSummary>>("/account/watched", {
    params: { page, perPage, search },
  });
}