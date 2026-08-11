import { useParams, Link } from "react-router-dom";
import {
  useUserProfile,
  useUserFavorites,
  useUserWatched,
  useUserReviews,
} from "../../hooks/useUserProfile";
import styles from "./styles.module.css";

export default function UserProfile() {
  const { id } = useParams();
  const userId = Number(id);

  const { data: user, isLoading: loadingUser } = useUserProfile(userId);
  const { data: favorites } = useUserFavorites(userId);
  const { data: watched } = useUserWatched(userId);
  const { data: reviewsData } = useUserReviews(userId);

  if (loadingUser || !user) return <p>Carregando...</p>;

  return (
    <div>
      <div className={styles.profileHeader}>
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.fullName ?? ""} className={styles.avatar} />
        ) : (
          <div className={styles.avatarFallback}>{user.initials}</div>
        )}
        <h1 className={styles.username}>{user.fullName}</h1>
      </div>

      {favorites && favorites.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Favoritos</h2>
          <div className={styles.sectionUnderline} />

          <div className={styles.carousel}>
            {favorites.map((filme) => (
              <Link to={`/movies/${filme.id}`} key={filme.id} className={styles.posterLink}>
                <img
                  src={filme.posterImageUrl ?? undefined}
                  alt={filme.title}
                  className={styles.poster}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {watched && watched.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Assistidos</h2>
          <div className={styles.sectionUnderline} />

          <div className={styles.carousel}>
            {watched.map((filme) => (
              <Link to={`/movies/${filme.id}`} key={filme.id} className={styles.posterLink}>
                <img
                  src={filme.posterImageUrl ?? undefined}
                  alt={filme.title}
                  className={styles.poster}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Reviews</h2>
        {reviewsData?.data.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <img
              src={review.movie.posterImageUrl ?? undefined}
              alt={review.movie.title}
              className={styles.reviewPoster}
            />
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
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}