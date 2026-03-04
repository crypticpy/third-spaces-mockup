import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import type { UserProfile } from "../../types";
import styles from "./ProfileSettings.module.css";

interface ProfileSettingsProps {
  profile: UserProfile;
}

export default function ProfileSettings({ profile }: ProfileSettingsProps) {
  const navigate = useNavigate();
  const { resetProfile } = useProfile();
  const [dyslexiaFont, setDyslexiaFont] = useState(() =>
    document.body.classList.contains("font-dyslexia"),
  );
  const [highContrast, setHighContrast] = useState(() =>
    document.body.classList.contains("theme-high-contrast"),
  );
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleDyslexia = () => {
    document.body.classList.toggle("font-dyslexia");
    setDyslexiaFont(!dyslexiaFont);
  };

  const toggleHighContrast = () => {
    document.body.classList.toggle("theme-high-contrast");
    setHighContrast(!highContrast);
  };

  const handleReset = () => {
    resetProfile();
    document.body.classList.remove("font-dyslexia", "theme-high-contrast");
    navigate("/");
  };

  const ageLabel =
    profile.ageRange === "8-10"
      ? "Still in elementary (8\u201310)"
      : profile.ageRange === "11-13"
        ? "Middle school vibes (11\u201313)"
        : profile.ageRange === "14-17"
          ? "High school crew (14\u201317)"
          : "Not set";

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Settings</h1>

      {/* Your Profile Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Profile</h2>

        <button
          className={styles.settingRow}
          onClick={() => navigate("/onboarding")}
        >
          <div className={styles.settingInfo}>
            <span className={styles.settingLabel}>Age range</span>
            <span className={styles.settingValue}>{ageLabel}</span>
          </div>
          <span className={styles.chevron} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </button>

        <button
          className={styles.settingRow}
          onClick={() => navigate("/onboarding")}
        >
          <div className={styles.settingInfo}>
            <span className={styles.settingLabel}>Interests</span>
            <span className={styles.settingValue}>
              {profile.interests.length > 0
                ? profile.interests
                    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
                    .join(", ")
                : "Not set"}
            </span>
          </div>
          <span className={styles.chevron} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </button>

        <button
          className={styles.settingRow}
          onClick={() => navigate("/onboarding")}
        >
          <div className={styles.settingInfo}>
            <span className={styles.settingLabel}>Transportation</span>
            <span className={styles.settingValue}>
              {profile.transportModes.length > 0
                ? profile.transportModes
                    .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
                    .join(", ")
                : "Not set"}
            </span>
          </div>
          <span className={styles.chevron} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </button>
      </section>

      {/* Accessibility Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Accessibility</h2>

        <div className={styles.toggleRow}>
          <div className={styles.settingInfo}>
            <span className={styles.settingLabel}>Dyslexia-friendly font</span>
            <span className={styles.settingHint}>
              Uses OpenDyslexic typeface
            </span>
          </div>
          <button
            role="switch"
            aria-checked={dyslexiaFont}
            className={`${styles.toggle} ${dyslexiaFont ? styles.toggleOn : ""}`}
            onClick={toggleDyslexia}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.settingInfo}>
            <span className={styles.settingLabel}>High contrast mode</span>
            <span className={styles.settingHint}>Increases color contrast</span>
          </div>
          <button
            role="switch"
            aria-checked={highContrast}
            className={`${styles.toggle} ${highContrast ? styles.toggleOn : ""}`}
            onClick={toggleHighContrast}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </section>

      {/* Language Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Language</h2>

        <div className={styles.languageToggle}>
          <button
            className={`${styles.langOption} ${language === "en" ? styles.langActive : ""}`}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
          <button
            className={`${styles.langOption} ${language === "es" ? styles.langActive : ""}`}
            onClick={() => setLanguage("es")}
          >
            Espa&ntilde;ol
          </button>
        </div>
      </section>

      {/* Privacy Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Privacy</h2>
        <div className={styles.privacyText}>
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
          <p>
            All your preferences are stored on this device only. We don&rsquo;t
            collect personal data, require logins, or track your activity. Your
            privacy matters.
          </p>
        </div>
      </section>

      {/* Reset */}
      <section className={styles.section}>
        {!showResetConfirm ? (
          <button
            className={styles.resetButton}
            onClick={() => setShowResetConfirm(true)}
          >
            Reset Profile
          </button>
        ) : (
          <div className={styles.resetConfirm}>
            <p className={styles.resetWarning}>
              This will clear all your preferences and start fresh. Are you
              sure?
            </p>
            <div className={styles.resetActions}>
              <button
                className={styles.resetCancel}
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button className={styles.resetConfirmBtn} onClick={handleReset}>
                Yes, Reset
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
