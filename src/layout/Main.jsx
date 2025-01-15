import { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Quran, Radio, BrowseQuran } from "../pages/index";
import { NotFound, PlayerAudio } from "../components/index";
import { Context } from "../context/Context";
import { UpperBar } from "./UpperBar";
export const Main = () => {
  const { passAudio } = useContext(Context);
  const location = useLocation();
  return (
    <main dir="rtl" className="relative py-20">
      {location.pathname !== "/browse_quran" && <UpperBar />}
      <Routes>
        <Route path="/" element={<Quran />} />
        <Route path="/radios" element={<Radio />} />
        <Route path="/browse_quran" element={<BrowseQuran />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {passAudio && <PlayerAudio />}
    </main>
  );
};
