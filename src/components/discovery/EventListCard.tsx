import { Link } from "react-router-dom";
import type { Event } from "../../types/index.ts";
import Badge from "../common/Badge.tsx";
import styles from "./EventListCard.module.css";

interface EventListCardProps {
  event: Event;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

function formatTime(timeStr: string): string {
  const [hoursStr, minutesStr] = timeStr.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = minutesStr;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return minutes === "00"
    ? `${displayHours} ${period}`
    : `${displayHours}:${minutes} ${period}`;
}

export default function EventListCard({ event }: EventListCardProps) {
  return (
    <Link to={`/event/${event.id}`} className={styles.card}>
      {/* Calendar icon */}
      <div className={styles.dateIcon} aria-hidden="true">
        <span className={styles.dateMonth}>
          {new Date(event.event_date + "T00:00:00")
            .toLocaleString("en-US", { month: "short" })
            .toUpperCase()}
        </span>
        <span className={styles.dateDay}>
          {new Date(event.event_date + "T00:00:00").getDate()}
        </span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.topRow}>
          <h3 className={styles.name}>{event.event_name}</h3>
          {event.event_reward && (
            <Badge variant="reward" label="Reward" size="sm" />
          )}
        </div>

        <div className={styles.details}>
          <span className={styles.dateTime}>
            {formatDate(event.event_date)} &middot;{" "}
            {formatTime(event.event_time_start)} -{" "}
            {formatTime(event.event_time_end)}
          </span>
        </div>

        <div className={styles.bottomRow}>
          <Badge
            variant="cost"
            label={event.cost === "free" ? "Free" : event.cost}
            size="sm"
          />
          <span className={styles.going}>
            {event.going_count} kids are going!
          </span>
          {event.registration_required && (
            <span className={styles.rsvp}>RSVP</span>
          )}
        </div>
      </div>
    </Link>
  );
}
