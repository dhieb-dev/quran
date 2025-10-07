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
    return `p-2 hover:bg-slate-50 hover:dark:bg-black/50 ${
      isActive && "bg-slate-50 dark:bg-black/50 text-blue-700 dark:text-red-400"
    }`;
  };
  useClickAnywhere(menuRef, () => setOpen(false));
  return (
    <>
      <Menu ref={menuRef} onclick={() => setOpen(!open)} />
      {open && (
        <nav
          ref={navRef}
          className="absolute top-full mt-4 left-4 right-4 bg-blue-50 dark:bg-slate-950 rounded overflow-hidden shadow-lg dark:shadow-slate-300/5 z-20"
        >
          <ul className="shadow-lg shadow-white/5">
            {navList.map(({ name, path }) => (
              <NavLink key={name} className={isActive} to={path}>
                {name}
              </NavLink>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};
