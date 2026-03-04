import type { Place, UserProfile } from "../types";

/**
 * Computes a Belonging Score (0-100) for a place relative to a user profile.
 * Higher = better match. This is a session-local ranking signal, not a stored number.
 */
export function computeBelongingScore(
  place: Place,
  profile: UserProfile,
  preferenceWeights: Record<string, number> = {},
): number {
  let score = 50; // baseline

  // --- Age match (high weight) ---
  if (profile.ageRange) {
    const [minStr, maxStr] = profile.ageRange.split("-");
    const userMin = parseInt(minStr, 10);
    const userMax = parseInt(maxStr, 10);
    if (place.age_min <= userMin && place.age_max >= userMax) {
      score += 15; // full match
    } else if (place.age_min <= userMax && place.age_max >= userMin) {
      score += 7; // partial overlap
    } else {
      score -= 10; // no overlap
    }
  }

  // --- Interest match (high weight) ---
  if (profile.interests.length > 0) {
    const overlap = place.activity_types.filter((t) =>
      profile.interests.includes(t),
    ).length;
    const ratio = overlap / profile.interests.length;
    score += Math.round(ratio * 15);
  }

  // --- Accessibility match (high weight if stated) ---
  if (profile.accessibilityNeeds.length > 0) {
    let accessMet = 0;
    if (
      profile.accessibilityNeeds.includes("wheelchair") &&
      place.wheelchair_accessible
    )
      accessMet++;
    if (
      profile.accessibilityNeeds.includes("sensory-friendly") &&
      place.sensory_friendly
    )
      accessMet++;
    if (profile.accessibilityNeeds.includes("quiet") && place.quiet_space)
      accessMet++;
    if (
      profile.accessibilityNeeds.includes("bilingual") &&
      place.bilingual_staff
    )
      accessMet++;
    const ratio = accessMet / profile.accessibilityNeeds.length;
    score += Math.round(ratio * 12);
  }

  // --- Youth popularity (medium weight) ---
  score += Math.min(8, Math.round(place.checkin_count / 40));

  // --- Youth rating (medium weight) ---
  if (place.youth_rating >= 4.5) score += 6;
  else if (place.youth_rating >= 4.0) score += 4;
  else if (place.youth_rating >= 3.5) score += 2;

  // --- Cost boost (low weight — free = small boost) ---
  if (place.cost === "free") score += 3;

  // --- Transport match (low weight) ---
  if (profile.transportModes.length > 0 && place.nearby_transit.length > 0) {
    if (profile.transportModes.includes("bus")) score += 2;
  }

  // --- Preference weight adjustments ---
  for (const type of place.activity_types) {
    const w = preferenceWeights[type] || 0;
    score += Math.max(-5, Math.min(5, w * 2));
  }

  // Clamp to 0-100
  return Math.max(0, Math.min(100, score));
}

/**
 * Returns true if the place scores above the "Great match for you!" threshold.
 */
export function isGreatMatch(score: number): boolean {
  return score >= 75;
}
