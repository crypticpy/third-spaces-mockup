import { INTEREST_OPTIONS } from "../../types";
import styles from "./InterestsStep.module.css";

interface InterestsStepProps {
  value: string[];
  onChange: (interests: string[]) => void;
}

const INTEREST_META: Record<string, { icon: string; colorVar: string }> = {
  sports: { icon: "\u26BD", colorVar: "var(--cat-sports)" },
  art: { icon: "\ud83c\udfa8", colorVar: "var(--cat-art)" },
  food: { icon: "\ud83c\udf55", colorVar: "var(--cat-food)" },
  nature: { icon: "\ud83c\udf3f", colorVar: "var(--cat-nature)" },
  gaming: { icon: "\ud83c\udfae", colorVar: "var(--cat-gaming)" },
  reading: { icon: "\ud83d\udcda", colorVar: "var(--cat-reading)" },
  music: { icon: "\ud83c\udfb5", colorVar: "var(--cat-music)" },
  animals: { icon: "\ud83d\udc3e", colorVar: "var(--cat-animals)" },
  outdoors: { icon: "\ud83c\udfd5\ufe0f", colorVar: "var(--cat-outdoors)" },
  technology: { icon: "\ud83d\udcbb", colorVar: "var(--cat-technology)" },
  stem: { icon: "\ud83e\uddea", colorVar: "var(--cat-technology)" },
  crafts: { icon: "\u2702\ufe0f", colorVar: "var(--cat-art)" },
  skating: { icon: "\ud83d\udef9", colorVar: "var(--cat-sports)" },
  swimming: { icon: "\ud83c\udfca", colorVar: "var(--cat-sports)" },
  dance: { icon: "\ud83d\udc83", colorVar: "var(--cat-music)" },
  photography: { icon: "\ud83d\udcf7", colorVar: "var(--cat-art)" },
  cooking: {
    icon: "\ud83e\uddd1\u200d\ud83c\udf73",
    colorVar: "var(--cat-food)",
  },
  volunteering: { icon: "\ud83d\udc9a", colorVar: "var(--cat-nature)" },
};

const DISPLAY_NAMES: Record<string, string> = {
  sports: "Sports",
  art: "Art",
  food: "Food",
  nature: "Nature",
  gaming: "Gaming",
  reading: "Reading",
  music: "Music",
  animals: "Animals",
  outdoors: "Outdoors",
  technology: "Tech",
  stem: "STEM & Robotics",
  crafts: "Crafts & DIY",
  skating: "Skating",
  swimming: "Swimming",
  dance: "Dance",
  photography: "Photography",
  cooking: "Cooking",
  volunteering: "Volunteering",
};

export default function InterestsStep({ value, onChange }: InterestsStepProps) {
  const toggle = (interest: string) => {
    if (value.includes(interest)) {
      onChange(value.filter((i) => i !== interest));
    } else {
      onChange([...value, interest]);
    }
  };

  return (
    <div className={styles.step}>
      <h2 className={styles.title}>What are you into?</h2>
      <p className={styles.subtitle}>Pick as many as you want</p>

      <div className={styles.grid}>
        {INTEREST_OPTIONS.map((interest) => {
          const meta = INTEREST_META[interest] || {
            icon: "\u2b50",
            colorVar: "var(--coa-cyan)",
          };
          const isSelected = value.includes(interest);

          return (
            <button
              key={interest}
              className={`${styles.chip} ${isSelected ? styles.selected : ""}`}
              onClick={() => toggle(interest)}
              aria-pressed={isSelected}
              style={
                {
                  "--chip-color": meta.colorVar,
                } as React.CSSProperties
              }
            >
              <span className={styles.icon} aria-hidden="true">
                {meta.icon}
              </span>
              <span className={styles.label}>
                {DISPLAY_NAMES[interest] || interest}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
