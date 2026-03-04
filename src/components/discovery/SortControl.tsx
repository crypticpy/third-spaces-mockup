import type { SortOption } from "../../types/index.ts";
import styles from "./SortControl.module.css";

interface SortControlProps {
  current: SortOption;
  onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "belonging", label: "Best Match" },
  { value: "distance", label: "Nearest" },
  { value: "recent", label: "New" },
];

export default function SortControl({ current, onChange }: SortControlProps) {
  return (
    <div className={styles.sortBar} role="radiogroup" aria-label="Sort by">
      <span className={styles.label}>Sort:</span>
      <div className={styles.options}>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            role="radio"
            aria-checked={current === opt.value}
            className={`${styles.option} ${current === opt.value ? styles.active : ""}`}
            onClick={() => onChange(opt.value)}
            type="button"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
