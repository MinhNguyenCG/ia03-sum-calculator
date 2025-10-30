import { useState, useEffect, useRef } from "react";
import EquationStrip from "./EquationStrip";
import DigitBoard from "./DigitBoard";

/**
 * SumCalculator Component
 *
 * A two-section sum calculator with:
 * - Top: Inline equation strip with auto-calculating result
 * - Bottom: Interactive digit board with randomized rotations
 *
 * Features:
 * - Real-time validation and error messages
 * - Keyboard and mouse input support
 * - Full accessibility (ARIA, focus management, keyboard nav)
 * - Playful digit cards with random rotation
 */
function SumCalculator() {
  // Input state
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState(null);

  // Error state
  const [errorN1, setErrorN1] = useState("");
  const [errorN2, setErrorN2] = useState("");

  // Focus tracking
  const [focusedField, setFocusedField] = useState("n1");

  // Digit board state (0-9 with random rotations)
  const [digits, setDigits] = useState([]);

  // Refs for focus management
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  // Initialize digit board on mount
  useEffect(() => {
    initializeDigits();
    // Auto-focus first input on mount
    if (input1Ref.current) {
      input1Ref.current.focus();
    }
  }, []);

  /**
   * Initialize digits with random rotations
   */
  const initializeDigits = () => {
    const newDigits = Array.from({ length: 10 }, (_, i) => ({
      value: i,
      rotate: Math.floor(Math.random() * 25) - 12, // -12 to +12 degrees
    }));
    setDigits(newDigits);
  };

  /**
   * Shuffle digits (re-randomize rotations and order)
   */
  const shuffleDigits = () => {
    const newDigits = Array.from({ length: 10 }, (_, i) => ({
      value: i,
      rotate: Math.floor(Math.random() * 25) - 12,
    }));

    // Fisher-Yates shuffle for random order
    for (let i = newDigits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDigits[i], newDigits[j]] = [newDigits[j], newDigits[i]];
    }

    setDigits(newDigits);
  };

  /**
   * Parse and validate both inputs
   * @returns {Object} { ok: boolean, n1: number, n2: number }
   */
  const parseAndValidate = () => {
    let isValid = true;
    let n1 = 0;
    let n2 = 0;

    // Validate number1
    const trimmed1 = number1.trim();
    if (trimmed1 === "") {
      setErrorN1("Number 1 cannot be empty");
      isValid = false;
    } else {
      const parsed1 = Number(trimmed1);
      if (!Number.isFinite(parsed1)) {
        setErrorN1("Please enter a valid number");
        isValid = false;
      } else {
        setErrorN1("");
        n1 = parsed1;
      }
    }

    // Validate number2
    const trimmed2 = number2.trim();
    if (trimmed2 === "") {
      setErrorN2("Number 2 cannot be empty");
      isValid = false;
    } else {
      const parsed2 = Number(trimmed2);
      if (!Number.isFinite(parsed2)) {
        setErrorN2("Please enter a valid number");
        isValid = false;
      } else {
        setErrorN2("");
        n2 = parsed2;
      }
    }

    return { ok: isValid, n1, n2 };
  };

  /**
   * Compute the sum if inputs are valid
   */
  const compute = () => {
    const { ok, n1, n2 } = parseAndValidate();
    if (ok) {
      setResult(n1 + n2);
    } else {
      setResult(null);
    }
  };

  /**
   * Handle explicit "Calculate Sum" button click
   * @param {Event} e - Submit event
   */
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    compute();
  };

  /**
   * Handle input change without auto-calculation
   * Clear field-specific errors while typing
   */
  const handleInputChange = (field, value) => {
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      if (field === "n1") {
        setNumber1(value);
        if (errorN1) setErrorN1("");
      } else {
        setNumber2(value);
        if (errorN2) setErrorN2("");
      }
      // Do not compute automatically; keep last result until Calculate is pressed
    }
  };

  /**
   * Handle digit card click (append to focused field) without auto-calc
   */
  const onDigitClick = (digit) => {
    const digitStr = String(digit);

    if (focusedField === "n1") {
      const newValue = number1 + digitStr;
      setNumber1(newValue);
      if (errorN1) setErrorN1("");
      if (input1Ref.current) input1Ref.current.focus();
    } else {
      const newValue = number2 + digitStr;
      setNumber2(newValue);
      if (errorN2) setErrorN2("");
      if (input2Ref.current) input2Ref.current.focus();
    }
  };

  /**
   * Handle backspace on focused input without auto-calc
   */
  const backspace = () => {
    if (focusedField === "n1") {
      const newValue = number1.slice(0, -1);
      setNumber1(newValue);
      if (errorN1) setErrorN1("");
      if (input1Ref.current) input1Ref.current.focus();
    } else {
      const newValue = number2.slice(0, -1);
      setNumber2(newValue);
      if (errorN2) setErrorN2("");
      if (input2Ref.current) input2Ref.current.focus();
    }
  };

  /**
   * Clear both inputs and reset state
   */
  const clearField = () => {
    setNumber1("");
    setNumber2("");
    setErrorN1("");
    setErrorN2("");
    setResult(null);
    setFocusedField("n1");
    if (input1Ref.current) input1Ref.current.focus();
  };

  /**
   * Copy result to clipboard
   */
  const copyResult = async () => {
    if (result !== null) {
      try {
        await navigator.clipboard.writeText(String(result));
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  /**
   * Handle Enter key to submit
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {/* TOP SECTION: Equation Strip */}
      <EquationStrip
        input1Ref={input1Ref}
        input2Ref={input2Ref}
        number1={number1}
        number2={number2}
        result={result}
        errorN1={errorN1}
        errorN2={errorN2}
        onNumber1Change={(e) => handleInputChange("n1", e.target.value)}
        onNumber2Change={(e) => handleInputChange("n2", e.target.value)}
        onNumber1Focus={() => setFocusedField("n1")}
        onNumber2Focus={() => setFocusedField("n2")}
        onKeyDown={handleKeyDown}
        onCopyResult={copyResult}
        onCalculate={handleSubmit}
      />

      {/* BOTTOM SECTION: Digit Board */}
      <DigitBoard
        digits={digits}
        onDigitClick={onDigitClick}
        onShuffle={shuffleDigits}
        onBackspace={backspace}
        onClear={clearField}
        focusedField={focusedField}
      />
    </div>
  );
}

export default SumCalculator;
