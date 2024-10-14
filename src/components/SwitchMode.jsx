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
    <button className="theme p-[1px] rounded-full min-w-16 border-2 border-gray-400" onClick={() => setSwitchMode(prev => !prev)} title="Mode">
      <span className={`block rounded-full h-6 w-6 shadow-[inset_0px_0px_20px__yellow] ${switchMode && 'mr-0 ml-auto shadow-none'}`}>{modeIcon.sun}</span>
    </button>
  );
}
