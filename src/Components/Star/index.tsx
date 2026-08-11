import styles from "./styles.module.css";

interface StarRatingProps {
  value: number; 
  onChange: (value: number) => void;
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  function handleClick(starIndex: number, isHalf: boolean) {
    const newValue = isHalf ? starIndex - 0.5 : starIndex;
    onChange(newValue);
  }

  return (
    <div className={styles.starRating}>
      {stars.map((star) => {
        const filled = value >= star;
        const halfFilled = value >= star - 0.5 && value < star;

        return (
          <div key={star} className={styles.starWrapper}>
            <span
              className={styles.halfLeft}
              onClick={() => handleClick(star, true)}
            />
            <span
              className={styles.halfRight}
              onClick={() => handleClick(star, false)}
            />
            <span className={styles.star}>
              {filled ? "★" : halfFilled ? "⯨" : "☆"}
            </span>
          </div>
        );
      })}
    </div>
  );
}