import { useEffect, useState } from "react";
import { modeIcon } from "../svgs/mode";
const rootElement = document.documentElement;

export function SwitchMode() {
  const [switchMode, setSwitchMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });
  useEffect(() => {
    if (switchMode) {
      rootElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      rootElement.classList.remove("dark");
      localStorage.removeItem("darkMode", "true");
    }
  }, [switchMode]);

  return (
    <button
      className="theme animate-scale will-change-[scale]"
      onClick={() => setSwitchMode((prev) => !prev)}
      title="Mode"
    >
      <div className="flex items-center">
        <span className="text-sm me-1">{switchMode ? "Light" : "Dark"}</span>
        <span
          className={`relative w-6 rounded-full ${
            switchMode && "mr-0 ml-auto opacity-40"
          }`}
        >
          {modeIcon.sun}
          {switchMode && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 w-7 h-1 rounded bg-red-600"></span>
          )}
        </span>
      </div>
    </button>
  );
}
