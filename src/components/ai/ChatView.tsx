import { useState, useRef, useEffect } from "react";
import { places } from "../../data/places";
import type { ChatMessage, Place } from "../../types";
import ChatBubble from "./ChatBubble";
import styles from "./ChatView.module.css";

function findPlaces(ids: string[]): Place[] {
  return ids
    .map((id) => places.find((p) => p.id === id))
    .filter((p): p is Place => p !== undefined);
}

interface DemoResponse {
  text: string;
  placeIds: string[];
}

function getResponse(input: string): DemoResponse {
  const lower = input.toLowerCase();

  if (lower.includes("basketball")) {
    return {
      text: "There are 3 spots near you with courts. The YMCA on N Lamar is the closest and it's free drop-in on weeknights. Dove Springs Rec Center has open gym tonight if you want something later.",
      placeIds: [
        "ymca-north-lamar",
        "dove-springs-rec-center",
        "bartholomew-rec-center",
      ],
    };
  }

  if (
    lower.includes("study") ||
    lower.includes("library") ||
    lower.includes("quiet")
  ) {
    return {
      text: "The Austin Central Library on Cesar Chavez is solid for that \u2014 free, Wi-Fi, quiet-space certified, and they've got study rooms open after 3pm. It's about a 10 minute bus ride from central.",
      placeIds: ["austin-central-library"],
    };
  }

  if (
    lower.includes("art") ||
    lower.includes("creative") ||
    lower.includes("pottery")
  ) {
    return {
      text: "Bartholomew Rec Center has a Saturday pottery drop-in that's free \u2014 all skill levels, no sign-up. The Asian American Resource Center also does art workshops most weekends. Both are solid.",
      placeIds: ["bartholomew-rec-center", "asian-american-resource-center"],
    };
  }

  if (
    lower.includes("nature") ||
    lower.includes("outside") ||
    lower.includes("outdoors") ||
    lower.includes("park")
  ) {
    return {
      text: "Zilker Park is the obvious one \u2014 huge, free, and there's always something going on. But if you want something quieter, the Nature & Science Center next door is underrated. Free entry, cool trails, and they have live animals.",
      placeIds: ["zilker-park", "austin-nature-science-center"],
    };
  }

  if (
    lower.includes("bored") ||
    lower.includes("anything") ||
    lower.includes("something to do")
  ) {
    return {
      text: "Depends what you're in the mood for. Thinkery is great if you're into science and building stuff \u2014 it's hands-on, not boring museum vibes. Or if you just want to hang outside, Mueller Lake Park has a cool trail and it's pretty chill.",
      placeIds: ["thinkery", "mueller-lake-park"],
    };
  }

  return {
    text: "Not sure I found the right thing for that. Try telling me what you're in the mood for \u2014 like 'somewhere to play sports' or 'a chill place to hang out.' The more specific, the better I can help.",
    placeIds: [],
  };
}

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  text: "Hey! I'm here to help you find cool places in Austin. Try asking me something like 'where can I play basketball near me?' or 'somewhere chill to study after school.'",
  timestamp: Date.now(),
};

export default function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const SUGGESTIONS = [
    "Where can I play basketball?",
    "Somewhere chill to study",
    "What's free this weekend?",
    "I'm bored, surprise me",
  ];

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(text);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: response.text,
        places:
          response.placeIds.length > 0
            ? findPlaces(response.placeIds)
            : undefined,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 500);
  };

  const handleSuggestionTap = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = getResponse(text);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: response.text,
        places:
          response.placeIds.length > 0
            ? findPlaces(response.placeIds)
            : undefined,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      {/* Messages area */}
      <div className={styles.messages} ref={scrollRef}>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Suggestion chips — only visible with initial greeting */}
      {messages.length === 1 && (
        <div className={styles.suggestions}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className={styles.suggestionChip}
              onClick={() => handleSuggestionTap(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className={styles.inputArea}>
        <div className={styles.inputRow}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            aria-label="Chat input"
          />

          {/* Mic icon (visual only) */}
          <button className={styles.micBtn} aria-label="Voice input" disabled>
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
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>

          {/* Send button */}
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="Send message"
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
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
