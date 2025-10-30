import DigitCard from "./DigitCard";
import { Shuffle, Delete, Eraser } from "lucide-react";

/**
 * DigitBoard Component
 *
 * Interactive digit board with shuffleable cards and control buttons
 *
 * @param {Object} props
 * @param {Array} props.digits - Array of digit objects with {value, rotate}
 * @param {Function} props.onDigitClick - Handler when a digit is clicked
 * @param {Function} props.onShuffle - Handler for shuffle button
 * @param {Function} props.onBackspace - Handler for backspace button
 * @param {Function} props.onClear - Handler for clear button
 * @param {string} props.focusedField - Currently focused field ('n1' or 'n2')
 */
function DigitBoard({
  digits = [],
  onDigitClick,
  onShuffle,
  onBackspace,
  onClear,
  focusedField = "n1",
}) {
  return (
    <section
      className="
        p-8 rounded-[var(--border-radius)] 
        bg-[var(--bg-card)] 
        border border-[var(--border-color)]
        shadow-[var(--shadow-md)]
      "
      aria-label="Digit Input Board"
    >
      {/* Control Buttons */}
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <button
          type="button"
          className="
            inline-flex items-center gap-1.5
            rounded-lg py-2.5 px-4
            text-sm font-semibold
            cursor-pointer
            transition-all duration-300
            bg-[var(--bg-primary)]
            border-2 border-[var(--border-color)]
            text-[var(--text-primary)]
            font-[var(--font-family)]
            hover:border-[var(--accent-primary)] hover:bg-[var(--accent-light)] 
            active:translate-y-0
            focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-[3px]
          "
          onClick={onShuffle}
          aria-label="Shuffle digit cards"
        >
          <Shuffle aria-hidden="true" size={18} />
          <span>Shuffle</span>
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            className="
              inline-flex items-center gap-1.5
              rounded-lg py-2.5 px-4
              text-sm font-semibold
              cursor-pointer
              transition-all duration-300
              bg-[var(--bg-primary)]
              border-2 border-[var(--border-color)]
              text-[var(--text-primary)]
              font-[var(--font-family)]
              hover:border-[var(--accent-primary)] hover:bg-[var(--accent-light)] 
              active:translate-y-0
              focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-[3px]
            "
            onClick={onBackspace}
            aria-label="Backspace on focused input"
          >
            <Delete aria-hidden="true" size={18} />
            <span>Backspace</span>
          </button>
          <button
            type="button"
            className="
              inline-flex items-center gap-1.5
              rounded-lg py-2.5 px-4
              text-sm font-semibold
              cursor-pointer
              transition-all duration-300
              bg-[var(--bg-primary)]
              border-2 border-[var(--border-color)]
              text-[var(--text-primary)]
              font-[var(--font-family)]
              hover:border-[var(--accent-primary)] hover:bg-[var(--accent-light)] 
              active:translate-y-0
              focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-[3px]
            "
            onClick={onClear}
            aria-label="Clear both inputs"
          >
            <Eraser aria-hidden="true" size={18} />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Digit Cards Grid */}
      <div
        className="
          grid gap-4 mb-6 p-4
          rounded-[var(--border-radius)]
          bg-[var(--bg-primary)]
          grid-cols-[repeat(auto-fit,minmax(60px,1fr))]
          md:grid-cols-5 md:gap-5
          lg:grid-cols-10
        "
        role="group"
        aria-label="Number pad"
      >
        {digits.map((digit, index) => (
          <DigitCard
            key={`${digit.value}-${index}`}
            digit={digit.value}
            rotation={digit.rotate}
            onClick={onDigitClick}
          />
        ))}
      </div>

      {/* Focus Indicator */}
      <div
        className="
          text-center p-3 rounded-lg text-sm
          bg-[var(--bg-primary)]
          text-[var(--text-secondary)]
        "
        aria-live="polite"
        aria-atomic="true"
      >
        Currently editing:{" "}
        <strong className="text-[var(--accent-primary)] font-bold">
          {focusedField === "n1" ? "Number 1" : "Number 2"}
        </strong>
      </div>
    </section>
  );
}

export default DigitBoard;
