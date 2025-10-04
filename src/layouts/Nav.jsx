import { NavLink } from "react-router";
import { Menu } from "../components";
import { useRef, useState } from "react";
import { useClickAnywhere } from "../hooks";

const navList = [
  { name: "القرآن الكريم", path: "/" },
  { name: "الإذاعات", path: "/radios" },
  { name: "المصاحف", path: "/mashafs" },
];
export const Nav = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const isActive = ({ isActive }) => {
    return `p-2 hover:bg-slate-100 hover:dark:bg-black/80 ${
      isActive &&
      "bg-slate-100 dark:bg-black/80 text-blue-700 dark:text-red-400"
    }`;
  };
  useClickAnywhere(menuRef, () => setOpen(false));
  return (
    <>
      <Menu ref={menuRef} onclick={() => setOpen(!open)} />
      <nav
        ref={navRef}
        className={`absolute top-full mt-4 left-4 right-4 bg-slate-200 dark:bg-slate-900 rounded overflow-hidden z-20 ${
          open ? "scale-y-100 translate-y-0" : "scale-y-0 -translate-y-1/2"
        } duration-150`}
      >
        <ul className="shadow-lg shadow-white/5">
          {navList.map(({ name, path }) => (
            <NavLink key={name} className={isActive} to={path}>
              {name}
            </NavLink>
          ))}
        </ul>
      </nav>
    </>
  );
};
