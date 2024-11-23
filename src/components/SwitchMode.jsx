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
      className="theme"
      onClick={() => setSwitchMode((prev) => !prev)}
      title="Mode"
    >
      <div className="relative">
        <span
          className={`block rounded-full h-6 w-6 ${
            switchMode && "mr-0 ml-auto opacity-40"
          }`}
        >
          {modeIcon.sun}
          {switchMode && (
            <span className="block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 w-7 h-1 rounded bg-red-600 "></span>
          )}
        </span>
      </div>
    </button>
  );
}
