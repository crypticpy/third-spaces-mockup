import { useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import styles from "./WelcomeScreen.module.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { completeOnboarding } = useProfile();

  const handleSkip = () => {
    completeOnboarding();
    navigate("/explore");
  };

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <img
          src={`${import.meta.env.BASE_URL}logos/COA-Logo-Horizontal-Official-RGB.png`}
          alt="City of Austin"
          className={styles.logo}
        />

        <h1 className={styles.title}>Third Spaces</h1>
        <p className={styles.subtitle}>Find places where you belong</p>

        <div className={styles.privacy}>
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
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>
            Your data stays on your device. No login required. No tracking.
          </span>
        </div>

        <button
          className={styles.startButton}
          onClick={() => navigate("/onboarding")}
        >
          Get Started
        </button>

        <button className={styles.skipLink} onClick={handleSkip}>
          Skip &amp; Explore
        </button>
      </div>

      <div className={styles.bgDecor} aria-hidden="true" />
    </div>
  );
}
