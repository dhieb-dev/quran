import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { useClickOutside } from "../hooks";
import { navIcon } from "../svgs/nav";
const nav = [
  {
    title: "القرآن الكريم",
    link: "/",
    ico: navIcon.quran,
    style: "grid place-content-center",
  },
  {
    title: "الإذاعات",
    link: "/radios",
    ico: navIcon.radio,
  },
  {
    title: "متصفح القرآن",
    link: "/browse_quran",
    ico: navIcon.browseQuran,
  },
];
export function Nav() {
  const [show, setShow] = useState(false);
  const btnRef = useRef();
  useClickOutside(btnRef, () => {
     setShow(false);
  });
  const navBarStyle = ({ isActive }) =>
    `p-2 flex items-end w-40 ${
      isActive && "text-blue-400"
    }`;
  return (
    <nav className="flex justify-between items-center w-full">
      <Logo />
      <button ref={btnRef} className="w-9" onClick={() => setShow(!show)}>
        <svg
          className="pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={`${
              show ? "stroke-red-400" : "stroke-black dark:stroke-white"
            }`}
            d="M5 8H19M5 16H19M3 12H21"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {show && (
        <ul
          dir="rtl"
          className="fixed top-24 right-40 left-40 py-10 px-4 z-10 grid place-content-center bg-gradient-to-tr from-slate-300/80 to-white dark:from-slate-900/80 dark:to-black rounded-lg border-2 border-gray-400 dark:border-gray-400/40 text-sm font-bold"
        >
          {nav.map(({ title, link, ico, style }) => (
            <li key={title}>
              <NavLink to={link} className={navBarStyle}>
                <span className={`${style} w-[28px] me-2`}>{ico}</span>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
