import { useState, useCallback } from "react";

const STORAGE_KEY = "third-spaces-preferences";

interface PreferenceWeights {
  [activityType: string]: number; // positive = like, negative = dislike
}

function loadPreferences(): PreferenceWeights {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return {};
}

export function usePreferences() {
  const [weights, setWeights] = useState<PreferenceWeights>(loadPreferences);

  const recordPreference = useCallback(
    (activityTypes: string[], direction: "more" | "less") => {
      setWeights((prev) => {
        const next = { ...prev };
        const delta = direction === "more" ? 1 : -1;
        for (const type of activityTypes) {
          next[type] = (next[type] || 0) + delta;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  return { weights, recordPreference };
}
