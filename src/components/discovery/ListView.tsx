import type { Place, Event } from "../../types/index.ts";
import PlaceListCard from "./PlaceListCard.tsx";
import EventListCard from "./EventListCard.tsx";
import styles from "./ListView.module.css";

interface ScoredPlace {
  place: Place;
  score: number;
}

interface ListViewProps {
  scoredPlaces: ScoredPlace[];
  events: Event[];
}

export default function ListView({ scoredPlaces, events }: ListViewProps) {
  if (scoredPlaces.length === 0 && events.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon} aria-hidden="true">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h3 className={styles.emptyTitle}>No spots found</h3>
        <p className={styles.emptyText}>
          Try adjusting your filters or search to discover more places.
        </p>
      </div>
    );
  }

  // Build an interleaved list: places with events inserted after their matching place
  const eventsByPlaceId = new Map<string, Event[]>();
  const unmatchedEvents: Event[] = [];

  for (const event of events) {
    const placeMatches = scoredPlaces.some(
      (sp) => sp.place.id === event.place_id,
    );
    if (placeMatches) {
      const existing = eventsByPlaceId.get(event.place_id) ?? [];
      existing.push(event);
      eventsByPlaceId.set(event.place_id, existing);
    } else {
      unmatchedEvents.push(event);
    }
  }

  return (
    <div className={styles.list}>
      {scoredPlaces.map(({ place, score }) => (
        <div key={place.id} className={styles.group}>
          <PlaceListCard place={place} score={score} />
          {eventsByPlaceId.get(place.id)?.map((event) => (
            <EventListCard key={event.id} event={event} />
          ))}
        </div>
      ))}
      {unmatchedEvents.length > 0 && (
        <div className={styles.eventsSection}>
          <h4 className={styles.eventsSectionTitle}>Upcoming Events</h4>
          {unmatchedEvents.map((event) => (
            <EventListCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
