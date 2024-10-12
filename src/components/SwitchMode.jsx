import { useEffect, useState } from "react";
import { modeIcon } from "../svgs/mode";
const rootElement = document.documentElement;

export function SwitchMode() {
  const [switchMode, setSwitchMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setSwitchMode(savedMode);
    if (savedMode) {
      rootElement.classList.add("dark");
    }
  }, []);

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
    <button
      className="theme p-0.5 w-[64px] rounded-full border-2 border-gray-200"
      onClick={() => setSwitchMode((prev) => !prev)}
      title="Mode"
    >
      <span
        className={`block w-[24px] rounded-full shadow-[inset_0px_0px_20px__yellow] ${
          switchMode && "ml-auto mr-0 shadow-none"
        }`}
      >
        {modeIcon.sun}
      </span>
    </button>
  );
}


// import { useEffect, useState } from "react";
// import { modeIcon } from "../svgs/mode";
// const rootElement = document.documentElement;

// export function SwitchMode() {
//   const [switchMode, setSwitchMode] = useState(() => {
//     const savedMode = localStorage.getItem("darkMode");
//     return savedMode === "true";
//   });
//   useEffect(() => {
//     if (switchMode) {
//       rootElement.classList.add("dark");
//       localStorage.setItem("darkMode", "true");
//     } else {
//       rootElement.classList.remove("dark");
//       localStorage.setItem("darkMode", "false");
//     }
//   }, [switchMode]);

//   return (
//     <button className="theme p-0.5 w-[64px] rounded-full border-2 border-gray-200" onClick={() => setSwitchMode(prev => !prev)} title="Mode">
//       <span className={`block w-[24px] rounded-full shadow-[inset_0px_0px_20px__yellow] ${switchMode && 'translate-x-full shadow-none'}`}>{modeIcon.sun}</span>
//     </button>
//   );
// }
