import styles from "./PlaceholderPhoto.module.css";

/** Resolved hex colors for gradient generation (must match CSS variables) */
const CATEGORY_COLORS: Record<string, { primary: string; secondary: string }> =
  {
    sports: { primary: "#009CDE", secondary: "#44499C" },
    art: { primary: "#9F3CC9", secondary: "#44499C" },
    food: { primary: "#FF8F00", secondary: "#F83125" },
    nature: { primary: "#009F4D", secondary: "#009CDE" },
    gaming: { primary: "#FFC600", secondary: "#FF8F00" },
    reading: { primary: "#22254E", secondary: "#9F3CC9" },
    music: { primary: "#9F3CC9", secondary: "#F83125" },
    animals: { primary: "#8F5201", secondary: "#009F4D" },
    outdoors: { primary: "#009CDE", secondary: "#009F4D" },
    technology: { primary: "#FFC600", secondary: "#009CDE" },
    stem: { primary: "#009CDE", secondary: "#FFC600" },
    crafts: { primary: "#9F3CC9", secondary: "#FF8F00" },
    skating: { primary: "#009CDE", secondary: "#FFC600" },
    swimming: { primary: "#009CDE", secondary: "#22254E" },
    dance: { primary: "#9F3CC9", secondary: "#F83125" },
    photography: { primary: "#9F3CC9", secondary: "#FFC600" },
    cooking: { primary: "#FF8F00", secondary: "#8F5201" },
    volunteering: { primary: "#009F4D", secondary: "#22254E" },
  };

/** Emoji icons per activity type */
const CATEGORY_ICONS: Record<string, string> = {
  sports: "\u26BD",
  art: "\uD83C\uDFA8",
  food: "\uD83C\uDF55",
  nature: "\uD83C\uDF3F",
  gaming: "\uD83C\uDFAE",
  reading: "\uD83D\uDCDA",
  music: "\uD83C\uDFB5",
  animals: "\uD83D\uDC3E",
  outdoors: "\uD83C\uDFD5\uFE0F",
  technology: "\uD83D\uDCBB",
  stem: "\uD83E\uDDEA",
  crafts: "\u2702\uFE0F",
  skating: "\uD83D\uDEF9",
  swimming: "\uD83C\uDFCA",
  dance: "\uD83D\uDC83",
  photography: "\uD83D\uDCF7",
  cooking: "\uD83E\uDDD1\u200D\uD83C\uDF73",
  volunteering: "\uD83D\uDC9A",
};

const DEFAULT_COLORS = { primary: "#44499C", secondary: "#009CDE" };

/** Simple numeric hash from a string for slight angle variation */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface PlaceholderPhotoProps {
  activityTypes: string[];
  name: string;
  size?: "small" | "medium" | "hero";
  className?: string;
}

export default function PlaceholderPhoto({
  activityTypes,
  name,
  size = "small",
  className = "",
}: PlaceholderPhotoProps) {
  const primaryType = activityTypes[0] || "";
  const colors = CATEGORY_COLORS[primaryType] || DEFAULT_COLORS;
  const icon = CATEGORY_ICONS[primaryType] || "\u2B50";
  const firstLetter = name.charAt(0) || "?";

  // Use name hash to vary the gradient angle slightly per place
  const nameHash = hashString(name);
  const angle = 120 + (nameHash % 60); // range 120-179deg

  // If there's a secondary activity type, mix in a third color stop
  const secondaryType = activityTypes[1] || "";
  const secondaryColors = CATEGORY_COLORS[secondaryType];
  const midColor = secondaryColors ? secondaryColors.primary : colors.secondary;

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${colors.primary} 0%, ${midColor} 50%, ${colors.secondary} 100%)`,
  };

  return (
    <div
      className={`${styles.container} ${styles[size]} ${className}`}
      aria-hidden="true"
    >
      <div className={styles.gradient} style={gradientStyle} />
      <div className={styles.pattern} />
      <div className={styles.shimmer} />
      <span className={styles.letter}>{firstLetter}</span>
      <span className={styles.icon}>{icon}</span>
      {size === "hero" && <div className={styles.vignette} />}
    </div>
  );
}
