import { useState, useCallback } from "react";
import type { UserProfile } from "../types";

const STORAGE_KEY = "third-spaces-profile";
const ONBOARDING_KEY = "third-spaces-onboarded";

const DEFAULT_PROFILE: UserProfile = {
  ageRange: null,
  interests: [],
  transportModes: [],
  accessibilityNeeds: [],
  neighborhood: null,
  maxDistance: null,
};

function loadProfile(): UserProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return DEFAULT_PROFILE;
}

export function useProfile() {
  const [profile, setProfileState] = useState<UserProfile>(loadProfile);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(
    () => localStorage.getItem(ONBOARDING_KEY) === "true",
  );

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const completeOnboarding = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setHasCompletedOnboarding(true);
  }, []);

  const resetProfile = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ONBOARDING_KEY);
    setProfileState(DEFAULT_PROFILE);
    setHasCompletedOnboarding(false);
  }, []);

  return {
    profile,
    updateProfile,
    hasCompletedOnboarding,
    completeOnboarding,
    resetProfile,
  };
}
