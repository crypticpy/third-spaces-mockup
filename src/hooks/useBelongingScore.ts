import { useMemo } from "react";
import type { Place, UserProfile } from "../types";
import { computeBelongingScore } from "../utils/scoring";

export function useBelongingScore(
  places: Place[],
  profile: UserProfile,
  preferenceWeights: Record<string, number> = {},
) {
  const scored = useMemo(() => {
    return places.map((place) => ({
      place,
      score: computeBelongingScore(place, profile, preferenceWeights),
    }));
  }, [places, profile, preferenceWeights]);

  const sorted = useMemo(() => {
    return [...scored].sort((a, b) => b.score - a.score);
  }, [scored]);

  return sorted;
}
