import { Outlet } from "react-router";
import { Footer, Header, PlayerAudio } from "./index";
import { IsOnline, TopBack } from "../components/index";

export const LayoutRoot = () => {
  return (
    <>
      <Header />
      <main dir="rtl" className="container mx-auto p-4 min-h-[70vh]">
        <Outlet />
      </main>
      <TopBack />
      <IsOnline />
      <PlayerAudio />
      <Footer />
    </>
  );
};
