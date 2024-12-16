import { useEffect, useState } from "react";
import { Nav, SwitchMode, Container } from "../components/index";
export function Header() {
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) setFixed(true);
      else setFixed(false);
    };
    if (window.location.pathname === "/browse_quran") setFixed(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fixed]);
  return (
    <header
      className={`${
        fixed
          ? "fixed z-10 top-0 left-0 w-full bg-white/90 dark:bg-black/90"
          : "bg-white/70 dark:bg-black/60"
      } py-3`}
    >
      <Container>
        <div className="relative flex justify-between items-center space-x-6">
          <Nav />
          <SwitchMode />
        </div>
      </Container>
    </header>
  );
}
