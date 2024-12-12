import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { useClickOutside, useResizeObserver } from "../hooks";
const mediaQuery = window.matchMedia("(max-width: 768px)");
const nav = [
  {
    title: "القرآن الكريم",
    link: "/",
    ico: require("../static/images/quran.png"),
  },
  {
    title: "الإذاعات",
    link: "/radios",
    ico: require("../static/images/radio.png"),
  },
  {
    title: "متصفح القرآن",
    link: "/browse_quran",
    ico: require("../static/images/radio.png"),
  },
];
export function Nav() {
  const [show, setShow] = useState(false);
  const [madia, setMedia] = useState(mediaQuery.matches);
  const btnRef = useRef();
  const matches = useResizeObserver(768);
  useClickOutside(btnRef, () => {
    if (!matches) setShow(false);
  });
  useEffect(() => {
    if (!matches) {
      setMedia(true);
    } else {
      setMedia(false);
    }
  }, [matches]);
  const navBarStyle = ({ isActive }) =>
    `p-2 flex items-end border-b-2 border-transparent ${isActive && "max-md:text-red-500 md:border-red-500"}`;
  return (
    <nav className="flex justify-between items-center w-full">
      <Logo />
      {madia && (
        <button ref={btnRef} className="w-10" onClick={() => setShow(!show)}>
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
      )}
      {(!madia || show) && (
        <ul
          dir="rtl"
          className="w-full flex justify-center rounded md:space-x-4 md:space-x-reverse max-md:bg-slate-50 max-md:dark:bg-neutral-800 max-md:border-2 max-md:border-black/50 max-md:dark:border-white/50 max-md:p-2 max-md:absolute max-md:top-full max-md:mt-5 max-md:left-0 max-md:z-10 max-md:flex-col max-md:space-y-2"
        >
          {nav.map(({ title, link, ico }) => (
            <li key={title}>
              <NavLink to={link} className={navBarStyle}>
                <img
                  src={ico}
                  alt={title}
                  className="ml-2 w-6 fill-black dark:fill-white"
                />
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
