import { useEffect, useState } from "react";
import { modeIcon } from "../svgs/mode";
const rootElement = document.documentElement
export function SwitchMode() {
  const [switchMode, setSwitchMode] = useState(true)
  useEffect(() => {
    switchMode ? rootElement.classList.remove("dark") : rootElement.classList.add("dark")
  }, [switchMode])
  return (
    <button onClick={() => setSwitchMode(!switchMode)} className="theme" title="Mode">
      <span className="block w-7">{switchMode ? modeIcon.moon : modeIcon.sun}</span>
    </button>
  )
}
