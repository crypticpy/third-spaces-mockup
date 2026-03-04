import styles from "./Badge.module.css";

type BadgeVariant = "match" | "reward" | "cost" | "category";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
  color?: string;
  size?: BadgeSize;
}

export default function Badge({
  variant,
  label,
  color,
  size = "sm",
}: BadgeProps) {
  const className = [styles.badge, styles[variant], styles[size]].join(" ");
  const displayLabel =
    variant === "match" && size === "sm" ? "Great match!" : label;

  return (
    <span
      className={className}
      style={
        color ? ({ "--badge-color": color } as React.CSSProperties) : undefined
      }
    >
      {variant === "reward" && (
        <svg
          className={styles.rewardIcon}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )}
      {displayLabel}
    </span>
  );
}
