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
      localStorage.setItem("darkMode", "false");
    }
  }, [switchMode]);

  return (
    <button onClick={() => setSwitchMode(prev => !prev)} className="theme" title="Mode">
      <span className="block w-7">{switchMode ? modeIcon.sun : modeIcon.moon}</span>
    </button>
  );
}
