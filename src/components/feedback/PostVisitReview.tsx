import { useState } from "react";
import styles from "./PostVisitReview.module.css";

interface PostVisitReviewProps {
  placeName: string;
  onSubmit: (data: {
    hadGoodTime: boolean;
    wouldGoBack: boolean;
    feedback?: string;
  }) => void;
  onClose: () => void;
}

export default function PostVisitReview({
  placeName,
  onSubmit,
  onClose,
}: PostVisitReviewProps) {
  const [step, setStep] = useState<1 | 2 | 3 | "done">(1);
  const [hadGoodTime, setHadGoodTime] = useState<boolean | null>(null);
  const [wouldGoBack, setWouldGoBack] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [needsFeedback, setNeedsFeedback] = useState(false);

  const handleGoodTime = (value: boolean) => {
    setHadGoodTime(value);
    if (!value) setNeedsFeedback(true);
    setStep(2);
  };

  const handleGoBack = (value: boolean) => {
    setWouldGoBack(value);
    if (!value) setNeedsFeedback(true);
    if (needsFeedback || !value) {
      setStep(3);
    } else {
      handleSubmit(value);
    }
  };

  const handleSubmit = (goBack?: boolean) => {
    onSubmit({
      hadGoodTime: hadGoodTime!,
      wouldGoBack: goBack ?? wouldGoBack!,
      feedback: feedback.trim() || undefined,
    });
    setStep("done");
    setTimeout(onClose, 1500);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.card}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Post-visit review"
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {step === "done" ? (
          <div className={styles.doneState}>
            <div className={styles.doneIcon}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--coa-green)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className={styles.doneText}>Thanks for sharing!</p>
          </div>
        ) : (
          <>
            <p className={styles.headerLabel}>How was {placeName}?</p>

            {step === 1 && (
              <div className={styles.questionBlock}>
                <p className={styles.question}>Did you have a good time?</p>
                <div className={styles.bigButtons}>
                  <button
                    className={`${styles.bigBtn} ${styles.yes}`}
                    onClick={() => handleGoodTime(true)}
                  >
                    <span className={styles.bigBtnEmoji} aria-hidden="true">
                      Yes!
                    </span>
                  </button>
                  <button
                    className={`${styles.bigBtn} ${styles.no}`}
                    onClick={() => handleGoodTime(false)}
                  >
                    <span className={styles.bigBtnEmoji} aria-hidden="true">
                      Not really
                    </span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.questionBlock}>
                <p className={styles.question}>Would you go back?</p>
                <div className={styles.bigButtons}>
                  <button
                    className={`${styles.bigBtn} ${styles.yes}`}
                    onClick={() => handleGoBack(true)}
                  >
                    <span className={styles.bigBtnEmoji} aria-hidden="true">
                      Definitely
                    </span>
                  </button>
                  <button
                    className={`${styles.bigBtn} ${styles.no}`}
                    onClick={() => handleGoBack(false)}
                  >
                    <span className={styles.bigBtnEmoji} aria-hidden="true">
                      Probably not
                    </span>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.questionBlock}>
                <p className={styles.question}>Tell us what happened</p>
                <p className={styles.hint}>
                  Your feedback helps us make better recommendations.
                </p>
                <div className={styles.textareaWrapper}>
                  <textarea
                    className={styles.textarea}
                    placeholder="What could have been better?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value.slice(0, 250))}
                    maxLength={250}
                    rows={3}
                    autoFocus
                  />
                  <span className={styles.charCount}>
                    {feedback.length}/250
                  </span>
                </div>
                <button
                  className={styles.submitBtn}
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
