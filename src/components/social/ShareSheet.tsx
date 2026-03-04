import styles from "./ShareSheet.module.css";

interface ShareSheetProps {
  placeName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareSheet({
  placeName,
  isOpen,
  onClose,
}: ShareSheetProps) {
  if (!isOpen) return null;

  const message = `I'm heading to ${placeName} — come join me!`;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.sheet}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Share with friends"
      >
        <div className={styles.handle} />

        <h3 className={styles.title}>Share with friends?</h3>

        <div className={styles.messagePreview}>
          <p className={styles.messageText}>{message}</p>
        </div>

        <div className={styles.icons}>
          <button className={styles.shareOption} onClick={onClose}>
            <div
              className={styles.iconCircle}
              style={{ background: "#34C759" }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden="true"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className={styles.optionLabel}>Messages</span>
          </button>

          <button className={styles.shareOption} onClick={onClose}>
            <div
              className={styles.iconCircle}
              style={{ background: "#25D366" }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
            </div>
            <span className={styles.optionLabel}>WhatsApp</span>
          </button>

          <button className={styles.shareOption} onClick={onClose}>
            <div
              className={styles.iconCircle}
              style={{ background: "#44499C" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </div>
            <span className={styles.optionLabel}>Copy Link</span>
          </button>
        </div>

        <button className={styles.doneBtn} onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
