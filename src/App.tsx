import { Routes, Route, Navigate } from "react-router-dom";
import { useProfile } from "./hooks/useProfile";
import AppShell from "./components/layout/AppShell";
import WelcomeScreen from "./components/onboarding/WelcomeScreen";
import OnboardingFlow from "./components/onboarding/OnboardingFlow";
import DiscoveryView from "./components/discovery/DiscoveryView";
import PlaceDetail from "./components/detail/PlaceDetail";
import ParentView from "./components/detail/ParentView";
import EventDetail from "./components/detail/EventDetail";
import ChatView from "./components/ai/ChatView";
import ProfileSettings from "./components/profile/ProfileSettings";

export default function App() {
  const { profile, hasCompletedOnboarding } = useProfile();

  return (
    <div className="app">
      <Routes>
        {/* Welcome & Onboarding — no shell */}
        <Route
          path="/"
          element={
            hasCompletedOnboarding ? (
              <Navigate to="/explore" replace />
            ) : (
              <WelcomeScreen />
            )
          }
        />
        <Route path="/onboarding" element={<OnboardingFlow />} />

        {/* Main app — with shell */}
        <Route element={<AppShell />}>
          <Route path="/explore" element={<DiscoveryView />} />
          <Route path="/chat" element={<ChatView />} />
          <Route
            path="/profile"
            element={<ProfileSettings profile={profile} />}
          />
        </Route>

        {/* Detail views — no bottom nav, own back button */}
        <Route path="/place/:id" element={<PlaceDetail />} />
        <Route path="/place/:id/parent" element={<ParentView />} />
        <Route path="/event/:id" element={<EventDetail />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
