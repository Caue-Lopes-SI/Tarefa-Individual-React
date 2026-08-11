import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useMovieDetails,
  useMovieReviews,
  useToggleFavorite,
  useToggleWatched,
  useCreateReview,
} from "../../hooks/useMovieDetails";
import Modal from "../../Components/modal";
import StarRating from "../../Components/Star";
import favoriteIcon from "../../assets/favoritos.png";
import EyeIcon from "../../assets/assistidos.png";
import LikeIcon from "../../assets/liked.png";
import styles from "./styles.module.css";
import { getAgeRatingColor } from "../../utils/ageRatingColor";

export default function MovieDetails() {
  const { id } = useParams();
  const movieId = Number(id);

  const { data: movie, isLoading } = useMovieDetails(movieId);
  const { data: reviewsData } = useMovieReviews(movieId);
  const toggleFavorite = useToggleFavorite(movieId);
  const toggleWatched = useToggleWatched(movieId);
  const createReview = useCreateReview(movieId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  if (isLoading || !movie) return <p>Carregando...</p>;

  function handleSubmitReview() {
    createReview.mutate(
      { movieId, rating, text },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setRating(0);
          setText("");
        },
      },
    );
  }

  return (
    <div>
      <img
        src={movie.bannerImageUrl ?? undefined}
        alt={movie.title}
        className={styles.banner}
      />

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{movie.title}</h1>

          <div className={styles.iconActions}>
            <button
              onClick={() => toggleFavorite.mutate(movie.isFavorite)}
              aria-label="Favoritar"
              className={movie.isFavorite ? styles.iconActive : ""}
            >
              <img src={movie.isFavorite ? LikeIcon : favoriteIcon} alt="" />
            </button>
            <button
              onClick={() => toggleWatched.mutate(movie.isWatched)}
              aria-label="Marcar como assistido"
              className={movie.isWatched ? styles.iconActive : ""}
            >
              <img src={EyeIcon} alt="" />
            </button>
          </div>
        </div>

        <div className={styles.metaGrid}>
          <div>
            <p className={styles.metaItem}>Ano: {movie.releaseYear}</p>
            {movie.durationMinutes && (
              <p className={styles.metaItem}>
                Duração: {Math.floor(movie.durationMinutes / 60)}h{" "}
                {movie.durationMinutes % 60}min
              </p>
            )}
            {movie.ageRating && (
              <p className={styles.metaItem}>
                <span
                  className={styles.ageBadge}
                  style={{
                    backgroundColor: getAgeRatingColor(movie.ageRating),
                  }}
                >
                  {movie.ageRating}
                </span>{" "}
                <span className={styles.descContent}>
                  {movie.contentWarning}
                </span>
              </p>
            )}
          </div>

          <div className={styles.metaRight}>
            {movie.cast && (
              <p className={styles.sideInfo}>
                <strong>Elenco: {movie.cast}</strong>
              </p>
            )}
            {movie.genres.length > 0 && (
              <p className={styles.sideInfo}>
                <strong>Gêneros:</strong>{" "}
                {movie.genres.map((g) => g.name).join(", ")}
              </p>
            )}
          </div>
        </div>
        <span className={styles.descContent}>
          <p className={styles.synopsis}>{movie.synopsis}</p>
        </span>
        <div className={styles.ratingRow}>
          <div className={styles.ratingBlock}>
            <div className={styles.ratingSummary}>
              <span className={styles.ratingStars}>
                {"★".repeat(Math.floor(movie.avgRating ?? 0))}
                {(movie.avgRating ?? 0) % 1 !== 0 ? "⯨" : ""}
                {"☆".repeat(5 - Math.ceil(movie.avgRating ?? 0))}
              </span>
              <span className={styles.ratingNumber}>
                {movie.avgRating?.toFixed(1) ?? "—"}
              </span>
            </div>
            <p className={styles.reviewCount}>{movie.reviewCount} avaliações</p>
          </div>
          <button
            className={styles.reviewButton}
            onClick={() => setIsModalOpen(true)}
          >
            Criar uma review
          </button>
        </div>
      </div>

      <div className={styles.reviewsSection}>
  <h2 className={styles.reviewsTitle}>Reviews</h2>

      {reviewsData?.data.map((review) => (
        <div key={review.id} className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <Link to={`/users/${review.user.id}`} className={styles.reviewUserLink}>
              {review.user.avatarUrl ? (
                <img
                  src={review.user.avatarUrl}
                  alt=""
                  className={styles.reviewAvatar}
                />
              ) : (
                <span className={styles.reviewAvatarFallback}>
                  {review.user.initials}
                </span>
              )}
              <span className={styles.reviewUsername}>
                {review.user.fullName}
              </span>
            </Link>
            <span className={styles.reviewStars}>
              {"★".repeat(Math.floor(review.rating))}
              {review.rating % 1 !== 0 ? "⯨" : ""}
              {"☆".repeat(5 - Math.ceil(review.rating))}
            </span>
          </div>
          <p className={styles.reviewText}>{review.text}</p>
        </div>
      ))}
    </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className={styles.modal}>
        <div className={styles.modalComponents}>
          <h3 className={styles.modalTitle}>Criar Review:</h3>
          <StarRating value={rating} onChange={setRating} />
          <textarea
            className={styles.modalTextarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escrever avaliação..."
          />
        </div>
        <button
          className={styles.modalSubmit}
          onClick={handleSubmitReview}
          disabled={
            createReview.isPending || rating === 0 || text.trim() === ""
          }
        >
          {createReview.isPending ? "Enviando..." : "Concluir"}
        </button>
      </Modal>
    </div>
  );
}
