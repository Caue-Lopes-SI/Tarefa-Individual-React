export interface Genre {
    id: number;
    name: string;
}

export interface MovieSummary{
    id: number;
    title: string;
    posterImageUrl: string | null;
    releaseYear: number;
    genres: Genre[];
}

export interface MovieDetail extends MovieSummary {
    synopsis: string;
    bannerImageUrl: string | null;
    durationMinutes: number | null;
    ageRating: string | null;
    contentWarning: string | null;
    cast: string | null;
    avgRating: number | null;
    reviewCount: number;
    isFavorite: boolean;
    isWatched: boolean;
}