import { useState } from "react";
import {
  useMyReviews,
  useDeleteReview,
  useUpdateReview,
} from "../../hooks/useMyReviews";
import Modal from "../../Components/modal";
import StarRating from "../../Components/Star";
import EditIcon from "../../assets/Edit.png";
import TrashIcon from "../../assets/trash.png";
import type { Review } from "../../Types/Review";
import styles from "./styles.module.css";

export default function MyReviews() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyReviews(page);
  const deleteReview = useDeleteReview();
  const updateReview = useUpdateReview();

  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);
  const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editText, setEditText] = useState("");

  function openEditModal(review: Review) {
    setReviewToEdit(review);
    setEditRating(review.rating);
    setEditText(review.text);
  }

  function handleConfirmDelete() {
    if (reviewToDelete === null) return;
    deleteReview.mutate(reviewToDelete, {
      onSuccess: () => setReviewToDelete(null),
    });
  }

  function handleConfirmEdit() {
    if (!reviewToEdit) return;
    updateReview.mutate(
      { movieId: reviewToEdit.movie.id, rating: editRating, text: editText },
      { onSuccess: () => setReviewToEdit(null) },
    );
  }

  if (isLoading || !data) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className={styles.title}>Minhas Avaliações</h1>

      <div className={styles.list}>
        {data.data.map((review) => (
          <div key={review.id} className={styles.card}>
            <img
              src={review.movie.posterImageUrl ?? undefined}
              alt={review.movie.title}
              className={styles.poster}
            />

            <div className={styles.content}>
              <div className={styles.header}>
                <p>{review.movie.title}</p>
                <span className={styles.year}>{review.movie.releaseYear}</span>
                <span className={styles.rating}>
                  {"★".repeat(Math.floor(review.rating))}
                  {review.rating % 1 !== 0 ? "⯨" : ""}
                  {"☆".repeat(5 - Math.ceil(review.rating))}
                </span>
              </div>
              <p className={styles.text}>{review.text}</p>
            </div>
            <div className={styles.actions}>
                  <button
                    aria-label="Editar review"
                    onClick={() => openEditModal(review)}
                  >
                    <img src={EditIcon} alt="" />
                  </button>
                  <button
                    aria-label="Apagar review"
                    onClick={() => setReviewToDelete(review.id)}
                  >
                    <img src={TrashIcon} alt="" />
                  </button>
                </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.arrowButton}
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          aria-label="Página anterior"
        >
          ‹
        </button>

        {Array.from({ length: data.metadata.lastPage }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={num === page ? styles.pageActive : styles.pageNumber}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}

        <button
          className={styles.arrowButton}
          disabled={page >= data.metadata.lastPage}
          onClick={() => setPage((p) => p + 1)}
          aria-label="Próxima página"
        >
          ›
        </button>
      </div>

      <Modal
        isOpen={reviewToDelete !== null}
        onClose={() => setReviewToDelete(null)}
        className={styles.modalDelete}
      >
        <p className={styles.confirmText}>
          Deseja apagar essa avaliação? Esta ação é{" "}
          <strong className={styles.danger}>irreversível</strong>.
        </p>
        <div className={styles.confirmActions}>
          <button
            className={styles.cancelButton}
            onClick={() => setReviewToDelete(null)}
          >
            Cancelar
          </button>
          <button
            className={styles.deleteButton}
            onClick={handleConfirmDelete}
            disabled={deleteReview.isPending}
          >
            {deleteReview.isPending ? "Apagando..." : "Apagar Avaliação"}
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={reviewToEdit !== null}
        onClose={() => setReviewToEdit(null)}
        className={styles.modalEdit}
      >
        <h3 className={styles.editTitle}>
          Editar Review: {reviewToEdit?.movie.title}
        </h3>
        <StarRating value={editRating} onChange={setEditRating} />
        <textarea
          className={styles.editTextarea}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <div className={styles.editActions}>
          <button
            className={styles.confirmEditButton}
            onClick={handleConfirmEdit}
            disabled={
              updateReview.isPending ||
              editRating === 0 ||
              editText.trim() === ""
            }
          >
            {updateReview.isPending ? "Salvando..." : "Concluir"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
