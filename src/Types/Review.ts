import type { MovieSummary } from "./Movie";

export interface PublicUser{
    id: number;
    fullName: string | null;
    avatarUrl: string | null;
    initials: string;
}

export interface Review {
    id: number;
    rating: number;
    text: string;
    createdAt: string;
    updatedAt: string;
    user: PublicUser;
    movie: MovieSummary;
}

export interface CreateReviewRequest {
    movieId: number;
    rating: number;
    text: string;
}