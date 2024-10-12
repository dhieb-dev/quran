import { Nav, SwitchMode, Container, Langs } from "../components/index";

export function Header() {
  return (
    <header className="relative py-3 bg-neutral-50/70 dark:bg-neutral-900/70">
      <Container>
        <div className="relative flex justify-between items-center space-x-6">
          <Nav />
          <Langs />
          <SwitchMode />
        </div>
      </Container>
    </header>
  )
}
