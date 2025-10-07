import { Logo, Theme } from "../components";
import { Nav } from "./index";

export const Header = () => {
  return (
    <header className="relative bg-neutral-50 dark:bg-neutral-900 shadow-md dark:shadow-white/5">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Logo />
        <Theme />
        <Nav />
      </div>
    </header>
  );
};
