// Third Spaces — City of Austin Youth Discovery App
// MVP Data Schema Types

// ---------------------------------------------------------------------------
// Core domain types
// ---------------------------------------------------------------------------

export interface Place {
  id: string;
  name: string;
  description: string;
  what_to_expect: string;
  latitude: number;
  longitude: number;
  address: string;
  photos: string[];
  hours: Record<string, string>;
  cost: "free" | "$" | "$$";
  cost_details: string;
  age_min: number;
  age_max: number;
  activity_types: string[];
  amenities: string[];
  wheelchair_accessible: boolean;
  sensory_friendly: boolean;
  quiet_space: boolean;
  bilingual_staff: boolean;
  bilingual_languages: string[];
  kid_safe: boolean;
  staffed: boolean;
  safety_notes: string;
  checkin_count: number;
  checkin_count_week: number;
  going_count: number;
  place_reward: string | null;
  youth_rating: number;
  vibe_tags: string[];
  nearby_transit: string[];
}

export interface Event {
  id: string;
  event_name: string;
  place_id: string;
  event_date: string;
  event_time_start: string;
  event_time_end: string;
  age_min: number;
  age_max: number;
  cost: "free" | "$" | "$$";
  description: string;
  event_reward: string | null;
  going_count: number;
  registration_required: boolean;
  registration_url: string | null;
}

export interface UserProfile {
  ageRange: "8-10" | "11-13" | "14-17" | null;
  interests: string[];
  transportModes: string[];
  accessibilityNeeds: string[];
  neighborhood: string | null;
  maxDistance: number | null;
}

export interface Filters {
  interests: string[];
  cost: ("free" | "$" | "$$")[];
  ageGroup: string | null;
  maxDistance: number | null;
  accessibility: string[];
  transportModes: string[];
}

export type SortOption = "belonging" | "distance" | "recent";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  places?: Place[];
  timestamp: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const INTEREST_OPTIONS: string[] = [
  "sports",
  "art",
  "food",
  "nature",
  "gaming",
  "reading",
  "music",
  "animals",
  "outdoors",
  "technology",
  "stem",
  "crafts",
  "skating",
  "swimming",
  "dance",
  "photography",
  "cooking",
  "volunteering",
];

export const TRANSPORT_OPTIONS: string[] = [
  "walk",
  "bike",
  "bus",
  "car",
  "family",
];

export const AGE_RANGES: string[] = ["8-10", "11-13", "14-17"];
