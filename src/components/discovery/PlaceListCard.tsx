import { Link } from "react-router-dom";
import type { Place } from "../../types/index.ts";
import Badge from "../common/Badge.tsx";
import PlaceholderPhoto from "../common/PlaceholderPhoto.tsx";
import styles from "./PlaceListCard.module.css";

/** Deterministic mock distance based on place name hash */
function mockDistance(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  const miles = 0.3 + (Math.abs(hash) % 40) / 10; // 0.3 to 4.3
  return `${miles.toFixed(1)} mi`;
}

/** Map activity type to its CSS variable color */
const CATEGORY_COLORS: Record<string, string> = {
  sports: "var(--cat-sports)",
  art: "var(--cat-art)",
  food: "var(--cat-food)",
  nature: "var(--cat-nature)",
  gaming: "var(--cat-gaming)",
  reading: "var(--cat-reading)",
  music: "var(--cat-music)",
  animals: "var(--cat-animals)",
  outdoors: "var(--cat-outdoors)",
  technology: "var(--cat-technology)",
};

interface PlaceListCardProps {
  place: Place;
  score: number;
}

export default function PlaceListCard({ place, score }: PlaceListCardProps) {
  return (
    <Link to={`/place/${place.id}`} className={styles.card}>
      {/* Photo placeholder */}
      <PlaceholderPhoto
        activityTypes={place.activity_types}
        name={place.name}
        size="small"
      />

      {/* Content */}
      <div className={styles.content}>
        {/* Top row: name + match badge */}
        <div className={styles.topRow}>
          <h3 className={styles.name}>{place.name}</h3>
          <div className={styles.topBadges}>
            {score >= 75 && (
              <Badge variant="match" label="Great match for you!" size="sm" />
            )}
            {place.place_reward && (
              <Badge variant="reward" label="Reward" size="sm" />
            )}
          </div>
        </div>

        {/* Description (1 line) */}
        <p className={styles.description}>{place.description}</p>

        {/* Category pills + cost */}
        <div className={styles.meta}>
          <div className={styles.categories}>
            {place.activity_types.slice(0, 3).map((type) => (
              <Badge
                key={type}
                variant="category"
                label={type}
                color={CATEGORY_COLORS[type]}
                size="sm"
              />
            ))}
          </div>
          <Badge
            variant="cost"
            label={place.cost === "free" ? "Free" : place.cost}
            size="sm"
          />
          <span className={styles.distance}>{mockDistance(place.name)}</span>
        </div>

        {/* Bottom row: check-in count + vibe tags */}
        <div className={styles.bottomRow}>
          <span className={styles.checkins}>
            {place.checkin_count} kids visited
          </span>
          <div className={styles.vibes}>
            {place.vibe_tags.map((tag) => (
              <span key={tag} className={styles.vibeTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
