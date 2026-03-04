import { useState, useMemo, useCallback } from "react";
import type { Filters, SortOption, Place } from "../../types/index.ts";
import { places } from "../../data/places.ts";
import { events } from "../../data/events.ts";
import { useProfile } from "../../hooks/useProfile.ts";
import { useBelongingScore } from "../../hooks/useBelongingScore.ts";
import { usePreferences } from "../../hooks/usePreferences.ts";
import ViewToggle from "./ViewToggle.tsx";
import MapView from "./MapView.tsx";
import ListView from "./ListView.tsx";
import FilterPanel from "./FilterPanel.tsx";
import SortControl from "./SortControl.tsx";
import styles from "./DiscoveryView.module.css";

type ViewMode = "map" | "list";

const DEFAULT_FILTERS: Filters = {
  interests: [],
  cost: [],
  ageGroup: null,
  maxDistance: null,
  accessibility: [],
  transportModes: [],
};

function applyFilters(allPlaces: Place[], filters: Filters): Place[] {
  return allPlaces.filter((place) => {
    // Interest filter
    if (filters.interests.length > 0) {
      const hasMatch = place.activity_types.some((t) =>
        filters.interests.includes(t),
      );
      if (!hasMatch) return false;
    }

    // Cost filter
    if (filters.cost.length > 0) {
      if (!filters.cost.includes(place.cost)) return false;
    }

    // Age group filter
    if (filters.ageGroup) {
      const [minStr, maxStr] = filters.ageGroup.split("-");
      const filterMin = parseInt(minStr, 10);
      const filterMax = parseInt(maxStr, 10);
      // Place must overlap with the age range
      if (place.age_max < filterMin || place.age_min > filterMax) return false;
    }

    // Accessibility filter
    if (filters.accessibility.length > 0) {
      for (const need of filters.accessibility) {
        if (need === "wheelchair" && !place.wheelchair_accessible) return false;
        if (need === "sensory-friendly" && !place.sensory_friendly)
          return false;
        if (need === "quiet" && !place.quiet_space) return false;
      }
    }

    return true;
  });
}

export default function DiscoveryView() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("belonging");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { profile } = useProfile();
  const { weights } = usePreferences();

  // Apply filters to places
  const filteredPlaces = useMemo(
    () => applyFilters(places, filters),
    [filters],
  );

  // Apply search query
  const searchedPlaces = useMemo(() => {
    if (!searchQuery.trim()) return filteredPlaces;
    const q = searchQuery.toLowerCase();
    return filteredPlaces.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.activity_types.some((t) => t.toLowerCase().includes(q)) ||
        p.vibe_tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [filteredPlaces, searchQuery]);

  // Score and sort places
  const scoredPlaces = useBelongingScore(searchedPlaces, profile, weights);

  // Apply sort
  const sortedPlaces = useMemo(() => {
    const copy = [...scoredPlaces];
    switch (sort) {
      case "belonging":
        // Already sorted by score from useBelongingScore
        return copy;
      case "distance":
        // Mock: sort by checkin_count_week as proxy for distance
        return copy.sort(
          (a, b) => b.place.checkin_count_week - a.place.checkin_count_week,
        );
      case "recent":
        // Mock: sort by going_count as proxy for recency/trending
        return copy.sort((a, b) => b.place.going_count - a.place.going_count);
      default:
        return copy;
    }
  }, [scoredPlaces, sort]);

  // Filter events to only those with matching place_ids
  const filteredEvents = useMemo(() => {
    const placeIds = new Set(searchedPlaces.map((p) => p.id));
    return events.filter((e) => placeIds.has(e.place_id));
  }, [searchedPlaces]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.interests.length > 0) count++;
    if (filters.cost.length > 0) count++;
    if (filters.ageGroup) count++;
    if (filters.maxDistance !== null) count++;
    if (filters.accessibility.length > 0) count++;
    if (filters.transportModes.length > 0) count++;
    return count;
  }, [filters]);

  const handleFilterApply = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className={styles.discovery}>
      {/* Search bar */}
      <div className={styles.searchBar}>
        <svg
          className={styles.searchIcon}
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
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search places, activities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search places"
        />
        <button
          className={styles.micBtn}
          type="button"
          aria-label="Voice search"
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
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      </div>

      {/* Controls row: toggle + filter button */}
      <div className={styles.controls}>
        <ViewToggle mode={viewMode} onChange={setViewMode} />
        <button
          className={styles.filterBtn}
          onClick={() => setFilterOpen(true)}
          type="button"
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
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className={styles.filterCount}>{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* Sort control (only for list view) */}
      {viewMode === "list" && (
        <div className={styles.sortRow}>
          <SortControl current={sort} onChange={setSort} />
          <span className={styles.resultCount}>
            {sortedPlaces.length} spots
          </span>
        </div>
      )}

      {/* Main content */}
      <div
        className={`${styles.mainContent} ${viewMode === "map" ? styles.mapMode : ""}`}
      >
        {viewMode === "map" ? (
          <MapView places={sortedPlaces} />
        ) : (
          <ListView scoredPlaces={sortedPlaces} events={filteredEvents} />
        )}
      </div>

      {/* Filter panel */}
      {filterOpen && (
        <FilterPanel
          filters={filters}
          onApply={handleFilterApply}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
}
