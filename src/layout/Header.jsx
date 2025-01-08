import { Nav, SwitchMode, Container } from "../components/index";
export function Header() {
  return (
    <header className="py-4 fixed z-10 top-0 left-0 w-full bg-primary">
      <Container>
        <div className="relative flex justify-between items-center space-x-6">
          <Nav />
          <SwitchMode />
        </div>
      </Container>
    </header>
  );
}
