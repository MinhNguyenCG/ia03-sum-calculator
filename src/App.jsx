import { useState, useEffect } from "react";
import { Calculator, Sun, Moon } from "lucide-react";
import SumCalculator from "./components/SumCalculator";
import "./index.css";

/**
 * Main App Component
 *
 * Features:
 * - Header with title and theme toggle
 * - Dark/Light theme support with localStorage persistence
 * - Responsive layout
 */
function App() {
  // Theme state (default to user's system preference)
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }

    // Fall back to system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex flex-col min-h-screen max-w-[1200px] mx-auto p-4 md:px-8 md:py-6">
      {/* Header */}
      <header className="flex justify-between items-center py-6 mb-8 border-b-2 border-[var(--border-color)]">
        <h1 className="font-bold text-[clamp(1.75rem,4vw,2.5rem)] text-[var(--text-primary)] flex items-center gap-3">
          <span className="text-[1.2em]" aria-hidden="true">
            <Calculator aria-hidden="true" size={28} />
          </span>
          Sum Calculator
        </h1>

        <button
          type="button"
          className="
            rounded-full w-12 h-12
            flex items-center justify-center
            cursor-pointer
            transition-all duration-300
            bg-[var(--bg-card)]
            border-2 border-[var(--border-color)]
            shadow-[var(--shadow-sm)]
            text-2xl
            hover:scale-110 hover:rotate-[15deg] hover:shadow-[var(--shadow-md)] hover:border-[var(--accent-primary)]
            focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-4
          "
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon aria-hidden="true" />
          ) : (
            <Sun aria-hidden="true" />
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <SumCalculator />
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-sm text-[var(--text-secondary)] border-t border-[var(--border-color)]">
        <p>
          Built with React + Vite | Keyboard shortcuts:{" "}
          <kbd className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded px-1.5 py-0.5 font-[var(--font-mono)] text-[0.85em] shadow-[var(--shadow-sm)]">
            Tab
          </kbd>{" "}
          to navigate,{" "}
          <kbd className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded px-1.5 py-0.5 font-[var(--font-mono)] text-[0.85em] shadow-[var(--shadow-sm)]">
            Enter
          </kbd>{" "}
          to calculate
        </p>
      </footer>
    </div>
  );
}

export default App;
