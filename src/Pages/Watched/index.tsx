import { useState } from "react";
import { Link } from "react-router-dom";
import { useWatched, useUnmarkWatched } from "../../hooks/useWatched";
import lupa from "../../assets/lupa.png";
import RemoveIcon from "../../assets/unwatch.png";
import styles from "./styles.module.css";

export default function Watched() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useWatched(page, search);
  const unmarkWatched = useUnmarkWatched();

  if (isLoading || !data) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className={styles.title}>Assistidos</h1>

      <div className={styles.searchBox}>
        <img src={lupa} alt="" />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Pesquisar...."
        />
      </div>

      <div className={styles.grid}>
        {data.data.map((filme) => (
          <div key={filme.id} className={styles.posterCard}>
            <button
              className={styles.removeButton}
              onClick={() => unmarkWatched.mutate(filme.id)}
              aria-label="Desmarcar como assistido"
            >
              <img src={RemoveIcon} alt="" />
            </button>
            <Link to={`/movies/${filme.id}`}>
              <img
                src={filme.posterImageUrl ?? undefined}
                alt={filme.title}
                className={styles.poster}
              />
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button className={styles.arrowButton} disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>‹</button>
        {Array.from({ length: data.metadata.lastPage }, (_, i) => i + 1).map((num) => (
          <button key={num} className={num === page ? styles.pageActive : styles.pageNumber} onClick={() => setPage(num)}>
            {num}
          </button>
        ))}
        <button className={styles.arrowButton} disabled={page >= data.metadata.lastPage} onClick={() => setPage((p) => p + 1)}>›</button>
      </div>
    </div>
  );
}