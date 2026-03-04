import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { places } from "../../data/places";
import { events } from "../../data/events";
import { useProfile } from "../../hooks/useProfile";
import { usePreferences } from "../../hooks/usePreferences";
import { computeBelongingScore, isGreatMatch } from "../../utils/scoring";
import Badge from "../common/Badge";
import PlaceholderPhoto from "../common/PlaceholderPhoto";
import RewardBadge from "./RewardBadge";
import ImGoingButton from "../social/ImGoingButton";
import PreferenceButtons from "../feedback/PreferenceButtons";
import styles from "./PlaceDetail.module.css";

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

const DAY_NAMES: Record<string, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

const AMENITY_ICONS: Record<string, string> = {
  wifi: "WiFi",
  restrooms: "Restrooms",
  parking: "Parking",
  food: "Food",
  "pet-friendly": "Pet-friendly",
};

function getTodayKey(): string {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[new Date().getDay()];
}

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = "";
  for (let i = 0; i < full; i++) stars += "\u2605";
  if (half) stars += "\u00BD";
  return `${stars} ${rating.toFixed(1)}`;
}

export default function PlaceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { weights, recordPreference } = usePreferences();
  const [hoursExpanded, setHoursExpanded] = useState(false);

  const place = places.find((p) => p.id === id);
  if (!place) {
    return (
      <div className={styles.notFound}>
        <p>Place not found.</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const score = computeBelongingScore(place, profile, weights);
  const great = isGreatMatch(score);
  const placeEvents = events.filter((e) => e.place_id === place.id);
  const todayKey = getTodayKey();
  const todayHours = place.hours[todayKey] || "Unavailable";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.address)}`;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <PlaceholderPhoto
          activityTypes={place.activity_types}
          name={place.name}
          size="hero"
          className={styles.heroBg}
        />
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
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>{place.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Match badge */}
        {great && (
          <div className={styles.matchRow}>
            <Badge variant="match" label="Great match for you!" size="md" />
          </div>
        )}

        {/* Description */}
        <section className={styles.section}>
          <p className={styles.description}>{place.description}</p>
        </section>

        {/* What to Expect */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What to Expect</h2>
          <p className={styles.bodyText}>{place.what_to_expect}</p>
        </section>

        {/* Quick info */}
        <section className={styles.infoGrid}>
          {/* Age */}
          <div className={styles.infoItem}>
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>
              Ages {place.age_min}-{place.age_max}
            </span>
          </div>

          {/* Cost */}
          <div className={styles.infoItem}>
            <Badge
              variant="cost"
              label={place.cost === "free" ? "Free" : place.cost}
              size="sm"
            />
            <span className={styles.costDetail}>{place.cost_details}</span>
          </div>
        </section>

        {/* Activity types */}
        <section className={styles.section}>
          <div className={styles.pills}>
            {place.activity_types.map((type) => (
              <Badge
                key={type}
                variant="category"
                label={type}
                color={CATEGORY_COLORS[type]}
                size="sm"
              />
            ))}
          </div>
        </section>

        {/* Hours */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Hours</h2>
          <div className={styles.todayHours}>
            <span className={styles.todayLabel}>Today</span>
            <span className={styles.todayValue}>{todayHours}</span>
          </div>
          <button
            className={styles.expandBtn}
            onClick={() => setHoursExpanded((prev) => !prev)}
            aria-expanded={hoursExpanded}
          >
            {hoursExpanded ? "Hide all hours" : "See all hours"}
            <svg
              className={`${styles.expandChevron} ${hoursExpanded ? styles.expandChevronOpen : ""}`}
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
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {hoursExpanded && (
            <div className={styles.allHours}>
              {Object.entries(place.hours).map(([day, hrs]) => (
                <div
                  key={day}
                  className={`${styles.hourRow} ${day === todayKey ? styles.hourRowToday : ""}`}
                >
                  <span className={styles.hourDay}>{DAY_NAMES[day]}</span>
                  <span className={styles.hourVal}>{hrs}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Amenities */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Amenities</h2>
          <div className={styles.amenityRow}>
            {place.amenities.map((a) => (
              <span key={a} className={styles.amenityChip}>
                {AMENITY_ICONS[a] || a}
              </span>
            ))}
          </div>
        </section>

        {/* Accessibility */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Accessibility</h2>
          <div className={styles.accessBadges}>
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
                Bilingual Staff ({place.bilingual_languages.join(", ")})
              </span>
            )}
          </div>
        </section>

        {/* Safety (for parents) */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Safety</h2>
          <div className={styles.safetyRow}>
            {place.kid_safe && (
              <span className={styles.safetyBadge}>
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
              <span className={styles.safetyBadge}>
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
          <p className={styles.safetyNote}>{place.safety_notes}</p>
        </section>

        {/* Stats */}
        <section className={styles.section}>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{place.checkin_count}</span>
              <span className={styles.statLabel}>kids visited this month</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>
                {renderStars(place.youth_rating)}
              </span>
              <span className={styles.statLabel}>youth rating</span>
            </div>
          </div>
        </section>

        {/* Reward */}
        <section className={styles.section}>
          <RewardBadge reward={place.place_reward} />
        </section>

        {/* Transit */}
        {place.nearby_transit.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Getting Here</h2>
            <ul className={styles.transitList}>
              {place.nearby_transit.map((t, i) => (
                <li key={i} className={styles.transitItem}>
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Events at this place */}
        {placeEvents.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Upcoming Events</h2>
            <div className={styles.eventsList}>
              {placeEvents.map((evt) => (
                <Link
                  key={evt.id}
                  to={`/event/${evt.id}`}
                  className={styles.eventCard}
                >
                  <span className={styles.eventName}>{evt.event_name}</span>
                  <span className={styles.eventMeta}>
                    {new Date(evt.event_date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" },
                    )}{" "}
                    &middot; {evt.cost === "free" ? "Free" : evt.cost}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Preference feedback */}
        <section className={styles.section}>
          <PreferenceButtons
            activityTypes={place.activity_types}
            onPreference={recordPreference}
          />
        </section>
      </div>

      {/* Sticky action bar */}
      <div className={styles.actionBar}>
        <ImGoingButton
          initialCount={place.going_count}
          placeName={place.name}
        />

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

        <Link to={`/place/${place.id}/parent`} className={styles.parentLink}>
          Show My Parent
        </Link>
      </div>
    </div>
  );
}
