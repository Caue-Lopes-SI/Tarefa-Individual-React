import { Link } from "react-router-dom";
import Carousel from "../../Components/carousel";
import styles from "../../Components/carousel/styles.module.css";
import categoryStyles from "./styles.module.css";
import { useMoviesByGenre } from "../../hooks/useHome";

interface CategoryCarouselProps {
  genreId: number;
  genreName: string;
  limit?: number;
}

export default function CategoryCarousel({
  genreId,
  genreName,
  limit = 8,
}: CategoryCarouselProps) {
  const { data: filmes, isLoading } = useMoviesByGenre(genreId, limit);

  if (isLoading || !filmes || filmes.length === 0) return null;

  return (
    <section className={categoryStyles.category}>
      <h2 className={categoryStyles.title}>{genreName}</h2>
      <div className={categoryStyles.categoryUnderline} />
      <Carousel className={categoryStyles.categoryCarousel}>
        {filmes.map((filme) => (
          <div
            className={`${styles.embla__slide} ${categoryStyles.categorySlide}`}
            key={filme.id}
          >
            <Link to={`/movies/${filme.id}`}>
              <img
                src={filme.posterImageUrl ?? undefined}
                alt={filme.title}
                className={categoryStyles.poster}
              />
            </Link>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
