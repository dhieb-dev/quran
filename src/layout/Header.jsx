import { Nav, SwitchMode, Container } from "../components/index";

export function Header() {
  return (
    <header className="py-3 bg-white/50 dark:bg-black/50">
      <Container>
        <div className="relative flex justify-between items-center space-x-6">
          <Nav />
          <SwitchMode />
        </div>
      </Container>
    </header>
  )
}
