import styles from "./AgeStep.module.css";

interface AgeStepProps {
  value: string | null;
  onChange: (ageRange: "8-10" | "11-13" | "14-17") => void;
}

const AGE_CARDS = [
  {
    range: "8-10" as const,
    label: "8 \u2013 10",
    description: "Still in elementary",
  },
  {
    range: "11-13" as const,
    label: "11 \u2013 13",
    description: "Middle school vibes",
  },
  {
    range: "14-17" as const,
    label: "14 \u2013 17",
    description: "High school crew",
  },
];

export default function AgeStep({ value, onChange }: AgeStepProps) {
  return (
    <div className={styles.step}>
      <h2 className={styles.title}>How old are you?</h2>

      <div className={styles.cards}>
        {AGE_CARDS.map((card) => (
          <button
            key={card.range}
            className={`${styles.card} ${value === card.range ? styles.selected : ""}`}
            onClick={() => onChange(card.range)}
            aria-pressed={value === card.range}
          >
            <span className={styles.range}>{card.label}</span>
            <span className={styles.description}>{card.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
