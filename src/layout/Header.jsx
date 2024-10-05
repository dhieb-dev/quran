import { Nav, SwitchMode, Container, Langs } from "../components/index";

export function Header() {
  return (
    <header className="relative py-3 bg-teal-50 dark:bg-gray-900">
      <Container>
        <div className="flex justify-between items-center">
          <Nav />
          <Langs />
          <SwitchMode />
        </div>
      </Container>
    </header>
  )
}
