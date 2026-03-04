import { useState } from "react";
import styles from "./PreferenceButtons.module.css";

interface PreferenceButtonsProps {
  activityTypes: string[];
  onPreference: (types: string[], direction: "more" | "less") => void;
}

export default function PreferenceButtons({
  activityTypes,
  onPreference,
}: PreferenceButtonsProps) {
  const [selected, setSelected] = useState<"more" | "less" | null>(null);

  const handleTap = (direction: "more" | "less") => {
    setSelected(direction);
    onPreference(activityTypes, direction);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${styles.more} ${selected === "more" ? styles.selected : ""}`}
        onClick={() => handleTap("more")}
        aria-label="More like this"
        disabled={selected !== null}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
        <span>More like this</span>
      </button>

      <button
        className={`${styles.btn} ${styles.less} ${selected === "less" ? styles.selected : ""}`}
        onClick={() => handleTap("less")}
        aria-label="Less like this"
        disabled={selected !== null}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
          <path d="M17 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
        </svg>
        <span>Less like this</span>
      </button>
    </div>
  );
}
