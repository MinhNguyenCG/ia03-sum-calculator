/**
 * DigitCard Component
 *
 * A playful digit card with random rotation
 *
 * @param {Object} props
 * @param {number} props.digit - The digit value (0-9)
 * @param {number} props.rotation - Rotation angle in degrees
 * @param {Function} props.onClick - Click handler
 */
function DigitCard({ digit, rotation = 0, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(digit);
    }
  };

  return (
    <button
      type="button"
      className="
        min-w-[56px] min-h-[56px] p-4
        text-3xl font-bold
        flex items-center justify-center
        cursor-pointer select-none
        rounded-xl
        border-2
        transition-all duration-300
        focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:z-10
        hover:scale-[1.15] hover:!rotate-0 hover:z-10
        active:scale-95 active:!rotate-0
        bg-[var(--card-bg)] backdrop-blur-[10px]
        border-[var(--card-border)]
        text-[var(--text-primary)]
        shadow-[var(--shadow-sm)]
        hover:bg-[var(--accent-light)] hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-md)]
        focus-visible:outline-[var(--accent-primary)]
        font-[var(--font-mono)]
        md:min-w-[64px] md:min-h-[64px] md:text-4xl
        lg:min-w-[72px] lg:min-h-[72px]
        xl:min-w-[80px] xl:min-h-[80px] xl:text-[2.25rem]
      "
      style={{
        transform: `rotate(${rotation}deg)`,
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onClick={handleClick}
      aria-label={`Insert digit ${digit}`}
    >
      {digit}
    </button>
  );
}

export default DigitCard;
