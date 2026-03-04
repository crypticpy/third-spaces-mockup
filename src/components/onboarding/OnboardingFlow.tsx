import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import AgeStep from "./AgeStep";
import InterestsStep from "./InterestsStep";
import TransportStep from "./TransportStep";
import styles from "./OnboardingFlow.module.css";

const TOTAL_STEPS = 3;

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const { profile, updateProfile, completeOnboarding } = useProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [_direction, setDirection] = useState<"forward" | "back">("forward");

  const [ageRange, setAgeRange] = useState<"8-10" | "11-13" | "14-17" | null>(
    profile.ageRange,
  );
  const [interests, setInterests] = useState<string[]>(profile.interests);
  const [transportModes, setTransportModes] = useState<string[]>(
    profile.transportModes,
  );

  const isLastStep = currentStep === TOTAL_STEPS - 1;

  const handleNext = () => {
    // Save the current step data
    if (currentStep === 0 && ageRange) {
      updateProfile({ ageRange });
    } else if (currentStep === 1) {
      updateProfile({ interests });
    } else if (currentStep === 2) {
      updateProfile({ transportModes });
      completeOnboarding();
      navigate("/explore");
      return;
    }

    if (!isLastStep) {
      setDirection("forward");
      setCurrentStep((s) => s + 1);
    }
  };

  const handleSkip = () => {
    if (isLastStep) {
      completeOnboarding();
      navigate("/explore");
    } else {
      setDirection("forward");
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection("back");
      setCurrentStep((s) => s - 1);
    }
  };

  const canProceed =
    currentStep === 0 ? ageRange !== null : currentStep === 1 ? true : true;

  return (
    <div className={styles.flow}>
      {/* Progress dots */}
      <div className={styles.progressBar}>
        {currentStep > 0 && (
          <button
            className={styles.backButton}
            onClick={handleBack}
            aria-label="Go back"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div className={styles.dots}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i <= currentStep ? styles.dotActive : ""}`}
              aria-label={`Step ${i + 1} of ${TOTAL_STEPS}${i === currentStep ? ", current" : ""}`}
            />
          ))}
        </div>

        <div className={styles.spacer} />
      </div>

      {/* Step content */}
      <div className={styles.stepContainer}>
        <div
          className={styles.stepSlider}
          style={{
            transform: `translateX(-${currentStep * 100}%)`,
          }}
        >
          <div className={styles.stepPanel}>
            <AgeStep value={ageRange} onChange={setAgeRange} />
          </div>
          <div className={styles.stepPanel}>
            <InterestsStep value={interests} onChange={setInterests} />
          </div>
          <div className={styles.stepPanel}>
            <TransportStep
              value={transportModes}
              onChange={setTransportModes}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.actions}>
        <button className={styles.skipButton} onClick={handleSkip}>
          Skip
        </button>
        <button
          className={styles.nextButton}
          onClick={handleNext}
          disabled={!canProceed}
        >
          {isLastStep ? "Done" : "Next"}
        </button>
      </div>
    </div>
  );
}
