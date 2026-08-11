import styles from "./styles.module.css";
import lupa from "../../assets/lupa.png";
import { useState, useEffect } from "react";
import Modal from "../../Components/modal";
import addIcon from "../../assets/addIcon.png";
import addIconWhite from "../../assets/whiteAdd.png";
import minusIcon from "../../assets/minusIcon.png";
import { getGenres, getMoviesByGenres } from "../../services/movieService";
import { Link, useSearchParams } from "react-router-dom";

interface Genero {
  id: number;
  name: string;
}

interface Filme {
  id: number;
  title: string;
  posterImageUrl: string | null;
}

export default function Search() {
  const[searchParams] = useSearchParams()
  const [pesquisa, setPesquisa] = useState(searchParams.get("q") ?? "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<number[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);

  useEffect(() => {
    getGenres().then((response) => setGeneros(response.data.data));
  }, []);

  function toggleFiltro(id: number) {
    setFiltrosSelecionados((atual) =>
      atual.includes(id) ? atual.filter((g) => g !== id) : [...atual, id],
    );
  }

  function removerFiltro(id: number) {
    setFiltrosSelecionados((atual) => atual.filter((g) => g !== id));
  }

  useEffect(() => {
    getMoviesByGenres(filtrosSelecionados).then((response) => {
      setFilmes(response.data.data);
    });
  }, [filtrosSelecionados]);

  const filmesFiltrados = filmes.filter((filme) =>
    filme.title.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  return (
    <main className={styles.main}>
      <div className={styles.input}>
        <img src={lupa} alt="lupa" />
        <input
          className={styles.pesquisa}
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          placeholder="Pesquisar...."
        />
      </div>
      <div className={styles.nav}>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.addFiltro}
        >
          <img src={addIconWhite} /> Adicionar Filtro
        </button>

        <div className={styles.tags}>
          {generos
            .filter((g) => filtrosSelecionados.includes(g.id))
            .map((g) => (
              <button
                key={g.id}
                onClick={() => removerFiltro(g.id)}
                className={styles.activeFilters}
              >
                {g.name} <span className={styles.minus} />
              </button>
            ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filmesFiltrados.map((filme) => (
          <Link to={`/movies/${filme.id}`} key={filme.id}>
            <img
              src={filme.posterImageUrl ?? ""}
              alt={filme.title}
              className={styles.poster}
            />
          </Link>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={styles.modal}
      >
        <h3 className={styles.modalTitle}>Gênero:</h3>
        <div className={styles.genreList}>
          {generos.map((g) => (
            <button
              key={g.id}
              className={
                filtrosSelecionados.includes(g.id)
                  ? styles.ativo
                  : styles.inativo
              }
              onClick={() => toggleFiltro(g.id)}
            >
              <div className={styles.genreButton}>
                {filtrosSelecionados.includes(g.id) ? (
                  <img src={minusIcon} />
                ) : (
                  <img src={addIcon} />
                )}{" "}
                {g.name}
              </div>
            </button>
          ))}
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.buttonDelete}
            onClick={() => setFiltrosSelecionados([])}
          >
            Apagar Todos os Filtros
          </button>
          <button
            className={styles.buttonConcluir}
            onClick={() => setIsModalOpen(false)}
          >
            Concluir
          </button>
        </div>
      </Modal>
    </main>
  );
}
