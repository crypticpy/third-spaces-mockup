import { useParams, useNavigate } from "react-router-dom";
import { places } from "../../data/places";
import styles from "./ParentView.module.css";

function getTodayKey(): string {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[new Date().getDay()];
}

export default function ParentView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const place = places.find((p) => p.id === id);
  if (!place) {
    return (
      <div className={styles.notFound}>
        <p>Place not found.</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const todayKey = getTodayKey();
  const todayHours = place.hours[todayKey] || "Unavailable";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.address)}`;

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
            width="20"
            height="20"
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
        <h1 className={styles.headerTitle}>For Parents & Guardians</h1>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Place name & address */}
        <section className={styles.section}>
          <h2 className={styles.placeName}>{place.name}</h2>
          <p className={styles.address}>{place.address}</p>
          <p className={styles.distance}>
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
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            0.8 miles away
          </p>
        </section>

        <hr className={styles.divider} />

        {/* Cost */}
        <section className={styles.section}>
          <h3 className={styles.label}>Cost</h3>
          <div className={styles.costRow}>
            <span className={styles.costBadge}>
              {place.cost === "free" ? "Free" : place.cost}
            </span>
            <span className={styles.costDetails}>{place.cost_details}</span>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Today's hours */}
        <section className={styles.section}>
          <h3 className={styles.label}>Today's Hours</h3>
          <p className={styles.hoursValue}>{todayHours}</p>
        </section>

        <hr className={styles.divider} />

        {/* Safety */}
        <section className={styles.section}>
          <h3 className={styles.label}>Safety</h3>
          <div className={styles.badgeRow}>
            {place.kid_safe && (
              <span className={styles.safeBadge}>
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
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Kid-safe
              </span>
            )}
            {place.staffed && (
              <span className={styles.safeBadge}>
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
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Staffed
              </span>
            )}
          </div>
          <p className={styles.safetyNotes}>{place.safety_notes}</p>
        </section>

        <hr className={styles.divider} />

        {/* Accessibility */}
        <section className={styles.section}>
          <h3 className={styles.label}>Accessibility</h3>
          <div className={styles.badgeRow}>
            {place.wheelchair_accessible && (
              <span className={styles.accessBadge}>Wheelchair Accessible</span>
            )}
            {place.sensory_friendly && (
              <span className={styles.accessBadge}>Sensory Friendly</span>
            )}
            {place.quiet_space && (
              <span className={styles.accessBadge}>Quiet Space</span>
            )}
            {place.bilingual_staff && (
              <span className={styles.accessBadge}>
                Bilingual ({place.bilingual_languages.join(", ")})
              </span>
            )}
          </div>
        </section>

        <hr className={styles.divider} />

        {/* What to expect */}
        <section className={styles.section}>
          <h3 className={styles.label}>What to Expect</h3>
          <p className={styles.bodyText}>{place.what_to_expect}</p>
        </section>

        {/* Directions button */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.directionsBtn}
        >
          <svg
            width="18"
            height="18"
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
          Launch Directions
        </a>
      </div>
    </div>
  );
}
