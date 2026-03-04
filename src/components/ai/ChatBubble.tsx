import { Link } from "react-router-dom";
import type { ChatMessage, Place } from "../../types";
import Badge from "../common/Badge";
import styles from "./ChatBubble.module.css";

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

interface ChatBubbleProps {
  message: ChatMessage;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function MiniPlaceCard({ place }: { place: Place }) {
  return (
    <Link to={`/place/${place.id}`} className={styles.miniCard}>
      <div className={styles.miniCardHeader}>
        <span className={styles.miniCardName}>{place.name}</span>
        <span className={styles.miniCardCost}>
          {place.cost === "free" ? "Free" : place.cost}
        </span>
      </div>
      <div className={styles.miniCardPills}>
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
    </Link>
  );
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`${styles.row} ${isUser ? styles.userRow : styles.assistantRow}`}
    >
      <div
        className={`${styles.bubble} ${isUser ? styles.userBubble : styles.assistantBubble}`}
      >
        <p className={styles.text}>{message.text}</p>

        {message.places && message.places.length > 0 && (
          <div className={styles.placeCards}>
            {message.places.map((place) => (
              <MiniPlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>

      <span className={styles.timestamp}>{formatTime(message.timestamp)}</span>
    </div>
  );
}
