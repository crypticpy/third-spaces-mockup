import { useState } from "react";
import styles from "./RewardBadge.module.css";

interface RewardBadgeProps {
  reward: string | null;
}

export default function RewardBadge({ reward }: RewardBadgeProps) {
  const [expanded, setExpanded] = useState(false);

  if (!reward) return null;

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.badge}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span>Reward!</span>
        <svg
          className={`${styles.chevron} ${expanded ? styles.chevronOpen : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        className={`${styles.details} ${expanded ? styles.detailsOpen : ""}`}
        aria-hidden={!expanded}
      >
        <p className={styles.detailsText}>{reward}</p>
      </div>
    </div>
  );
}
