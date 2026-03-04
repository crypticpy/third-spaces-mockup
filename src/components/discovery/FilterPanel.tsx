import { useState } from "react";
import type { Filters } from "../../types/index.ts";
import {
  INTEREST_OPTIONS,
  TRANSPORT_OPTIONS,
  AGE_RANGES,
} from "../../types/index.ts";
import styles from "./FilterPanel.module.css";

interface FilterPanelProps {
  filters: Filters;
  onApply: (filters: Filters) => void;
  onClose: () => void;
}

const COST_OPTIONS: Array<"free" | "$" | "$$"> = ["free", "$", "$$"];
const COST_LABELS: Record<string, string> = {
  free: "Free",
  $: "$",
  $$: "$$",
};

const DISTANCE_OPTIONS: Array<{ label: string; value: number | null }> = [
  { label: "< 1 mi", value: 1 },
  { label: "< 3 mi", value: 3 },
  { label: "< 5 mi", value: 5 },
  { label: "Any", value: null },
];

const ACCESSIBILITY_OPTIONS = [
  { key: "wheelchair", label: "Wheelchair accessible" },
  { key: "sensory-friendly", label: "Sensory-friendly" },
  { key: "quiet", label: "Quiet space" },
];

export default function FilterPanel({
  filters,
  onApply,
  onClose,
}: FilterPanelProps) {
  const [draft, setDraft] = useState<Filters>({ ...filters });

  function toggleArrayItem<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  }

  function handleClearAll() {
    setDraft({
      interests: [],
      cost: [],
      ageGroup: null,
      maxDistance: null,
      accessibility: [],
      transportModes: [],
    });
  }

  function handleApply() {
    onApply(draft);
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div
        className={styles.panel}
        role="dialog"
        aria-label="Filters"
        aria-modal="true"
      >
        {/* Handle bar */}
        <div className={styles.handleBar}>
          <div className={styles.handle} />
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Filters</h2>
          <button
            className={styles.clearBtn}
            onClick={handleClearAll}
            type="button"
          >
            Clear All
          </button>
        </div>

        {/* Scroll area */}
        <div className={styles.body}>
          {/* Interests */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Interests</h3>
            <div className={styles.chips}>
              {INTEREST_OPTIONS.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  className={`${styles.chip} ${draft.interests.includes(interest) ? styles.chipActive : ""}`}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      interests: toggleArrayItem(draft.interests, interest),
                    })
                  }
                >
                  {interest}
                </button>
              ))}
            </div>
          </section>

          {/* Cost */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Cost</h3>
            <div className={styles.chips}>
              {COST_OPTIONS.map((cost) => (
                <button
                  key={cost}
                  type="button"
                  className={`${styles.chip} ${draft.cost.includes(cost) ? styles.chipActive : ""}`}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      cost: toggleArrayItem(draft.cost, cost),
                    })
                  }
                >
                  {COST_LABELS[cost]}
                </button>
              ))}
            </div>
          </section>

          {/* Age Group */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Age Group</h3>
            <div className={styles.chips}>
              {AGE_RANGES.map((age) => (
                <button
                  key={age}
                  type="button"
                  className={`${styles.chip} ${draft.ageGroup === age ? styles.chipActive : ""}`}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      ageGroup: draft.ageGroup === age ? null : age,
                    })
                  }
                >
                  {age}
                </button>
              ))}
            </div>
          </section>

          {/* Distance */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Distance</h3>
            <div className={styles.chips}>
              {DISTANCE_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  className={`${styles.chip} ${draft.maxDistance === opt.value ? styles.chipActive : ""}`}
                  onClick={() => setDraft({ ...draft, maxDistance: opt.value })}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Accessibility */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Accessibility</h3>
            <div className={styles.checkboxes}>
              {ACCESSIBILITY_OPTIONS.map((opt) => (
                <label key={opt.key} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={draft.accessibility.includes(opt.key)}
                    onChange={() =>
                      setDraft({
                        ...draft,
                        accessibility: toggleArrayItem(
                          draft.accessibility,
                          opt.key,
                        ),
                      })
                    }
                  />
                  <span className={styles.checkboxCustom} aria-hidden="true">
                    {draft.accessibility.includes(opt.key) && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  {opt.label}
                </label>
              ))}
            </div>
          </section>

          {/* Transport */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>How I get around</h3>
            <div className={styles.chips}>
              {TRANSPORT_OPTIONS.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`${styles.chip} ${draft.transportModes.includes(mode) ? styles.chipActive : ""}`}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      transportModes: toggleArrayItem(
                        draft.transportModes,
                        mode,
                      ),
                    })
                  }
                >
                  {mode}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Apply button */}
        <div className={styles.footer}>
          <button
            className={styles.applyBtn}
            onClick={handleApply}
            type="button"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
