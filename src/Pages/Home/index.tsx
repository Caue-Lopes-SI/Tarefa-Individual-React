import FeaturedCarousel from "../../Components/featuredCarousel";
import CategoryCarousel from "../../Components/CategoryCarousel";
import { useGenres } from "../../hooks/useHome";
import { useRandomReviews } from "../../hooks/useHome";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";


export default function Home() {
  const { data: genres, isLoading: loadingGenres } = useGenres();
  const { data: reviews, isLoading: loadingReviews } = useRandomReviews(2);

  return (
    <main className={styles.main}>
      <FeaturedCarousel />
      <div className={styles.genres}>
        {!loadingGenres &&
          genres
            ?.slice(0, 4)
            .map((genre) => (
              <CategoryCarousel key={genre.id} genreId={genre.id} genreName={genre.name} limit = {5}/>
            ))}
      </div>

      <section className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Reviews</h2>

        {!loadingReviews &&
          reviews?.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <Link to={`/movies/${review.movie.id}`}>
                <img
                  src={review.movie.posterImageUrl ?? undefined}
                  alt={review.movie.title}
                  className={styles.reviewPoster}
                />
              </Link>
              <div className={styles.reviewContent}>
                <div className={styles.reviewHeader}>
                  <strong>{review.movie.title}</strong>
                  <span className={styles.reviewYear}>{review.movie.releaseYear}</span>
                  <span className={styles.reviewRating}>
                    {"★".repeat(Math.floor(review.rating))}
                    {review.rating % 1 !== 0 ? "⯨" : ""}
                    {"☆".repeat(5 - Math.ceil(review.rating))}
                  </span>
                </div>

                <Link to={`/users/${review.user.id}`} className={styles.reviewUser}>
                  {review.user.avatarUrl ? (
                    <img src={review.user.avatarUrl} alt={review.user.fullName ?? ""} />
                  ) : (
                    <span className={styles.reviewAvatarFallback}>
                      {review.user.initials}
                    </span>
                  )}
                  <span className={styles.reviewUsername}>{review.user.fullName}</span>
                </Link>

                <p className={styles.reviewText}>{review.text}</p>
              </div>
            </div>
          ))}
      </section>
    </main>
  );
}