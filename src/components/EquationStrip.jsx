import InputField from "./InputField";
import { Copy } from "lucide-react";

/**
 * EquationStrip Component
 *
 * Displays the inline equation: Number1 + Number2 = Result
 *
 * @param {Object} props
 * @param {Object} props.input1Ref - Ref for first input
 * @param {Object} props.input2Ref - Ref for second input
 * @param {string} props.number1 - Value of first number
 * @param {string} props.number2 - Value of second number
 * @param {number|null} props.result - Calculated result
 * @param {string} props.errorN1 - Error message for number 1
 * @param {string} props.errorN2 - Error message for number 2
 * @param {Function} props.onNumber1Change - Handler for number 1 change
 * @param {Function} props.onNumber2Change - Handler for number 2 change
 * @param {Function} props.onNumber1Focus - Handler for number 1 focus
 * @param {Function} props.onNumber2Focus - Handler for number 2 focus
 * @param {Function} props.onKeyDown - Handler for key down events
 * @param {Function} props.onCopyResult - Handler for copying result
 * @param {Function} props.onCalculate - Handler for calculate button
 */
function EquationStrip({
  input1Ref,
  input2Ref,
  number1,
  number2,
  result,
  errorN1,
  errorN2,
  onNumber1Change,
  onNumber2Change,
  onNumber1Focus,
  onNumber2Focus,
  onKeyDown,
  onCopyResult,
  onCalculate,
}) {
  return (
    <section
      className="
        p-8 rounded-[var(--border-radius)]
        bg-[var(--bg-card)]
        border border-[var(--border-color)]
        shadow-[var(--shadow-md)]
        lg:p-10
      "
      aria-label="Sum Calculation"
    >
      <div className="flex items-start justify-center gap-4 flex-wrap md:flex-nowrap">
        {/* Input 1 */}
        <InputField
          ref={input1Ref}
          id="number1"
          label="Number 1"
          value={number1}
          onChange={onNumber1Change}
          onFocus={onNumber1Focus}
          onKeyDown={onKeyDown}
          error={errorN1}
          placeholder="0"
        />

        {/* Plus Sign */}
        <span
          className="
            text-4xl font-bold mt-2
            text-[var(--text-secondary)]
          "
          aria-hidden="true"
        >
          +
        </span>

        {/* Input 2 */}
        <InputField
          ref={input2Ref}
          id="number2"
          label="Number 2"
          value={number2}
          onChange={onNumber2Change}
          onFocus={onNumber2Focus}
          onKeyDown={onKeyDown}
          error={errorN2}
          placeholder="0"
        />

        {/* Equals Sign */}
        <span
          className="
            text-4xl font-bold mt-2
            text-[var(--text-secondary)]
          "
          aria-hidden="true"
        >
          =
        </span>

        {/* Result Display */}
        <div className="flex-1 min-w-[160px] max-w-[220px]">
          <div
            className="
              text-white py-4 px-5
              rounded-[var(--border-radius)]
              font-bold text-lg
              shadow-[var(--shadow-md)]
              flex items-center gap-2 justify-center
              font-[var(--font-mono)]
              bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-hover)]
            "
            aria-live="polite"
            aria-atomic="true"
            role="status"
          >
            <span className="text-sm font-medium opacity-90">Result:</span>
            <span className="text-2xl tracking-tight">
              {result !== null ? result : "--"}
            </span>
            {result !== null && (
              <button
                type="button"
                className="
                  rounded px-2 py-1 text-base
                  cursor-pointer
                  transition-all duration-200
                  bg-white/20 border border-white/30
                  hover:bg-white/30 
                  active:scale-95
                "
                onClick={onCopyResult}
                aria-label="Copy result to clipboard"
                title="Copy to clipboard"
              >
                <Copy aria-hidden="true" size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Calculate Sum Button*/}
        <div className="flex justify-end">
          <button
            type="button"
            className="
            text-white rounded-[var(--border-radius)]
            py-5 px-10 text-base font-semibold
            cursor-pointer
            transition-all duration-300
            bg-[var(--accent-primary)]
            shadow-[var(--shadow-sm)]
            font-[var(--font-family)]
            hover:bg-[var(--accent-hover)] hover:shadow-[var(--shadow-md)]
            active:translate-y-0
            focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--accent-light)] focus-visible:outline-offset-4
          "
            onClick={onCalculate}
          >
            Calculate
          </button>
        </div>
      </div>
    </section>
  );
}

export default EquationStrip;
