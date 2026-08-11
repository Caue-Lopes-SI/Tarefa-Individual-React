import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import { useEffect } from 'react'
import styles from './styles.module.css'

interface CarouselProps {
  children: React.ReactNode
  className?: string
  onApiReady?: (api: EmblaCarouselType) => void
}

export default function Carousel({ children, className, onApiReady }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  useEffect(() => {
    if (emblaApi && onApiReady) {
      onApiReady(emblaApi)
    }
  }, [emblaApi, onApiReady])

  return (
    <div className={`${styles.embla} ${className ?? ''}`} ref={emblaRef}>
      <div className={styles.embla__container}>
        {children}
      </div>
    </div>
  )
}