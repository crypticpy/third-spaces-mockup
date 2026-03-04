import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { events } from "../../data/events";
import { places } from "../../data/places";
import RewardBadge from "./RewardBadge";
import ImGoingButton from "../social/ImGoingButton";
import Badge from "../common/Badge";
import styles from "./EventDetail.module.css";

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTime(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [toastVisible, setToastVisible] = useState(false);

  const event = events.find((e) => e.id === id);
  if (!event) {
    return (
      <div className={styles.notFound}>
        <p>Event not found.</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const place = places.find((p) => p.id === event.place_id);
  const directionsUrl = place
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.address)}`
    : "#";

  const handleAddCalendar = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <div className={styles.headerGradient}>
          <h1 className={styles.eventTitle}>{event.event_name}</h1>
          <p className={styles.dateTime}>
            {formatEventDate(event.event_date)} &middot;{" "}
            {formatTime(event.event_time_start)} -{" "}
            {formatTime(event.event_time_end)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Host place */}
        {place && (
          <Link to={`/place/${place.id}`} className={styles.hostPlace}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>
              At <strong>{place.name}</strong>
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        )}

        {/* Info row */}
        <div className={styles.infoRow}>
          <div className={styles.infoChip}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Ages {event.age_min}-{event.age_max}
          </div>
          <Badge
            variant="cost"
            label={event.cost === "free" ? "Free" : event.cost}
            size="md"
          />
        </div>

        {/* Description */}
        <section className={styles.section}>
          <p className={styles.description}>{event.description}</p>
        </section>

        {/* What to bring */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What to Bring</h2>
          <p className={styles.bodyText}>
            {event.registration_required
              ? "Check the registration page for any specific requirements."
              : "Just bring yourself! Everything you need will be provided."}
          </p>
        </section>

        {/* Tips */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Good to Know</h2>
          <p className={styles.bodyText}>
            Arrive a few minutes early to get settled. This event is designed
            for ages {event.age_min}–{event.age_max}, so you'll be with other
            kids your age.
            {event.cost === "free" ? " It's completely free!" : ""}
          </p>
        </section>

        {/* Registration notice */}
        {event.registration_required && (
          <div className={styles.regNotice}>
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
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Registration required</span>
            {event.registration_url && (
              <a
                href={event.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.regLink}
              >
                Register here
              </a>
            )}
          </div>
        )}

        {/* Reward */}
        <section className={styles.section}>
          <RewardBadge reward={event.event_reward} />
        </section>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div className={styles.toast}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Added to calendar!
        </div>
      )}

      {/* Sticky action bar */}
      <div className={styles.actionBar}>
        <ImGoingButton
          initialCount={event.going_count}
          placeName={event.event_name}
        />

        <div className={styles.actionRow}>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directionsBtn}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            Directions
          </a>

          <button className={styles.calendarBtn} onClick={handleAddCalendar}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
}
