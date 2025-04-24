import { NavLink } from "react-router";

const navList = [
  { name: "الرئيسية", path: "/" },
  { name: "الإذاعات", path: "/radios" },
];
export const Nav = () => {
  const isActive = ({ isActive }) => {
    return `px-2 ${
      isActive &&
      "text-blue-700 dark:text-red-400 border-b-2 border-blue-700 dark:border-red-400"
    }`;
  };
  return (
    <nav>
      <ul className="flex justify-between items-center gap-x-2">
        {navList.map(({ name, path }) => (
          <NavLink key={name} className={isActive} to={path}>
            {name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};
