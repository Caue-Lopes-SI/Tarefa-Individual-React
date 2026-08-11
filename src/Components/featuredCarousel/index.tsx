import { useState, useEffect } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import Carousel from "../../Components/carousel";
import styles from "../../Components/carousel/styles.module.css";
import homeStyles from "../../Pages/Home/styles.module.css";
import { getFeaturedMovies } from "../../services/movieService";
import { Link } from "react-router-dom";

interface Filme {
  id: number;
  title: string;
  posterImageUrl: string | null;
}

export default function FeaturedCarousel() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType>();
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    getFeaturedMovies()
      .then((response) => {
        setFilmes(response.data.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes em destaque:", error);
      });
  }, []);

  useEffect(() => {
    if (!emblaApi || filmes.length === 0) return;

    emblaApi.reInit();

    function onSelect() {
      setSelectedIndex(emblaApi!.selectedScrollSnap());
    }

    queueMicrotask(() => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, filmes]);

  return (
    <div className={homeStyles.featuredWrapper}>
      <Carousel
        onApiReady={setEmblaApi}
        className={homeStyles.featuredCarousel}
      >
        {filmes.map((filme) => (
          <div
            className={`${styles.embla__slide} ${homeStyles.featuredSlide}`}
            key={filme.id}
          >
            <Link to={`./movies/${filme.id}`}>
              <img
                src={filme.posterImageUrl ?? undefined}
                alt={filme.title}
                className={homeStyles.poster}
              />
            </Link>
          </div>
        ))}
      </Carousel>

      <div className={homeStyles.dots}>
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={
              index === selectedIndex ? homeStyles.dotActive : homeStyles.dot
            }
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}