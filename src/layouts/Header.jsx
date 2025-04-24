import { Container, Logo, Theme } from "../components";
import { Nav } from "./index";

export const Header = () => {
  return (
    <header className="bg-slate-100 dark:bg-neutral-900 shadow-md dark:shadow-white/10">
      <Container styles="flex justify-between items-center">
        <Logo />
        <Nav />
        <Theme />
      </Container>
    </header>
  );
};
