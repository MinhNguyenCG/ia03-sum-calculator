import { forwardRef } from "react";

/**
 * InputField Component
 *
 * A reusable input field with floating label and inline error display
 *
 * @param {Object} props
 * @param {string} props.id - Input ID
 * @param {string} props.label - Floating label text
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onFocus - Focus handler
 * @param {Function} props.onKeyDown - KeyDown handler
 * @param {string} props.error - Error message (if any)
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 */
const InputField = forwardRef(
  (
    {
      id,
      label,
      value,
      onChange,
      onFocus,
      onKeyDown,
      error = "",
      placeholder = "0",
      className = "",
    },
    ref
  ) => {
    return (
      <div
        className={`relative min-w-[120px] flex-1 max-w-[180px] md:max-w-[160px] ${className}`}
      >
        <label
          htmlFor={id}
          className="
            absolute -top-2 left-3 px-1.5
            text-xs font-semibold
            z-[1] pointer-events-none
            bg-[var(--bg-card)]
            text-[var(--text-secondary)]
          "
        >
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          id={id}
          className={`
            w-full py-3.5 px-4
            text-center text-xl
            rounded-[var(--border-radius)]
            transition-all duration-300
            font-[var(--font-mono)]
            bg-[var(--bg-primary)]
            text-[var(--text-primary)]
            border-2
            placeholder:text-[var(--text-muted)] placeholder:opacity-60
            hover:border-[var(--accent-primary)]
            focus:outline-none focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_var(--accent-light)]
            ${
              error
                ? "border-[var(--error-color)] bg-[var(--error-bg)]"
                : "border-[var(--border-color)]"
            }
          `}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${id}` : undefined}
        />
        {error && (
          <span
            id={`error-${id}`}
            className="
              block absolute top-full left-0 mt-1
              text-xs font-medium whitespace-nowrap
              text-[var(--error-color)]
            "
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
