import { useState } from "react";
import ShareSheet from "./ShareSheet";
import styles from "./ImGoingButton.module.css";

interface ImGoingButtonProps {
  initialCount: number;
  placeName: string;
}

export default function ImGoingButton({
  initialCount,
  placeName,
}: ImGoingButtonProps) {
  const [isGoing, setIsGoing] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [showShare, setShowShare] = useState(false);

  const handleTap = () => {
    if (isGoing) return;
    setIsGoing(true);
    setCount((c) => c + 1);
    // Brief delay then offer share
    setTimeout(() => setShowShare(true), 600);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <button
          className={`${styles.btn} ${isGoing ? styles.going : ""}`}
          onClick={handleTap}
        >
          {isGoing ? (
            <>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              You're going!
            </>
          ) : (
            "I'm Going!"
          )}
        </button>
        <p className={styles.count}>
          <span className={styles.countNum}>{count}</span> kids are going!
        </p>
      </div>

      <ShareSheet
        placeName={placeName}
        isOpen={showShare}
        onClose={() => setShowShare(false)}
      />
    </>
  );
}
