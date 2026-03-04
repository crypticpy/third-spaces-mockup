# Third Spaces -- City of Austin Youth Discovery App

A React/TypeScript mockup of the **Third Spaces** app for the City of Austin's Resident Data Impact Project (RIDP). This app helps Austin youth (ages 8-17) discover places where they belong.

> **This is a design reference mockup** -- all data is fake, there is no backend, and no personal information is collected. Built as a visual/UX reference for the Esri development team.

## Live Demo

Visit the live demo at: **https://crypticpy.github.io/third-spaces-mockup/**

## Features

- **Discovery View** -- Map and list toggle with 15 real Austin venues
- **Belonging Score** -- Personalized place ranking (0-100) based on age, interests, and preferences
- **Onboarding Quiz** -- 3-step wizard (age, interests, transport) with kid-friendly language
- **Place Detail** -- Full venue cards with hours, amenities, accessibility, safety, and transit info
- **Event Detail** -- 12 mock events with going counts, rewards, and calendar integration
- **AI Chat** -- Simulated conversational search with pre-scripted keyword-matching responses
- **"I'm Going!" Social** -- Tap to RSVP with share sheet (Messages, WhatsApp, Copy Link)
- **Parent View** -- Single-screen summary for parents/guardians
- **Accessibility** -- Dyslexia-friendly font toggle, high contrast mode, WCAG-compliant tap targets
- **Category-Colored Map Pins** -- Color-coded by activity type (sports=cyan, art=purple, etc.)

## Tech Stack

- **Vite + React 18 + TypeScript**
- **React Router v6** -- Client-side routing
- **Leaflet + OpenStreetMap** -- Interactive map (no API key required)
- **CSS Modules + CSS Custom Properties** -- City of Austin brand token system
- **localStorage** -- Profile persistence (no server, no PII)
- **Geist Font** -- City of Austin brand typography

## Brand Guidelines

Follows the **Austin Public Health Brand Guidelines**:

- Primary: Logo Blue `#44499C`, Logo Green `#009F4D`
- Extended palette for categories (cyan, purple, orange, yellow, etc.)
- Geist font family (SemiBold headlines, Regular body)
- Mobile-first at 390px viewport, min 44px tap targets

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Project Structure

```
src/
  components/
    layout/        -- AppShell, Header, BottomNav
    onboarding/    -- WelcomeScreen, OnboardingFlow, AgeStep, InterestsStep, TransportStep
    discovery/     -- DiscoveryView, MapView, ListView, FilterPanel, PlaceListCard, EventListCard
    detail/        -- PlaceDetail, EventDetail, ParentView, RewardBadge
    ai/            -- ChatView, ChatBubble
    feedback/      -- PreferenceButtons, PostVisitReview
    social/        -- ImGoingButton, ShareSheet
    common/        -- Badge, PlaceholderPhoto
    profile/       -- ProfileSettings
  data/            -- 15 mock places, 12 mock events
  hooks/           -- useProfile, usePreferences, useBelongingScore
  utils/           -- Belonging Score algorithm
  theme/           -- CSS custom properties, global styles
  types/           -- TypeScript interfaces
```

## Mock Data

- **15 Austin Places**: Austin Central Library, Zilker Park, Barton Springs Pool, YMCA North Lamar, Bartholomew Rec Center, Asian American Resource Center, Austin Nature & Science Center, Thinkery, Long Center, Dove Springs Rec Center, Northwest Rec Center, Roy G. Guerrero Park, Mueller Lake Park, Pease Park, Austin Bouldering Project
- **12 Events**: Saturday Pottery Drop-In, Open Gym Night, Coding Club, Nature Walk & Sketch, Teen Book Club, Basketball Tournament, Art in the Park, Science Saturday, DJ Workshop, Outdoor Movie Night, Skateboard Clinic, Community Garden Day

## License

City of Austin -- Internal use only.
