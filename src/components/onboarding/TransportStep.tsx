import styles from "./TransportStep.module.css";

interface TransportStepProps {
  value: string[];
  onChange: (modes: string[]) => void;
}

const TRANSPORT_META = [
  { id: "walk", label: "Walk", icon: "\ud83d\udeb6" },
  { id: "bike", label: "Bike", icon: "\ud83d\udeb2" },
  { id: "bus", label: "Bus", icon: "\ud83d\ude8c" },
  { id: "car", label: "Car / Rideshare", icon: "\ud83d\ude97" },
  {
    id: "family",
    label: "Family drives me",
    icon: "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
  },
];

export default function TransportStep({ value, onChange }: TransportStepProps) {
  const toggle = (mode: string) => {
    if (value.includes(mode)) {
      onChange(value.filter((m) => m !== mode));
    } else {
      onChange([...value, mode]);
    }
  };

  return (
    <div className={styles.step}>
      <h2 className={styles.title}>How do you get around?</h2>
      <p className={styles.subtitle}>Pick all that work for you</p>

      <div className={styles.options}>
        {TRANSPORT_META.map((mode) => {
          const isSelected = value.includes(mode.id);

          return (
            <button
              key={mode.id}
              className={`${styles.card} ${isSelected ? styles.selected : ""}`}
              onClick={() => toggle(mode.id)}
              aria-pressed={isSelected}
            >
              <span className={styles.icon} aria-hidden="true">
                {mode.icon}
              </span>
              <span className={styles.label}>{mode.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
