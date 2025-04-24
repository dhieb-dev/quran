import { Route, Routes } from "react-router";
import { Container } from "../components/index";
import { NotFound, Radios, Reciters, Surahs } from "../templates/index";
import { PlayerAudio, Tabs } from ".";
import { useState } from "react";
export const Main = () => {
  const [nameReciter, setNameReciter] = useState(null);

  return (
    <main dir="rtl" className="min-h-screen pb-10">
      <Container>
        <Tabs nameReciter={nameReciter} setNameReciter={setNameReciter} />
        <Routes>
          <Route
            path="/"
            element={<Reciters setNameReciter={setNameReciter} />}
          />
          <Route path="surahs" element={<Surahs />} />
          <Route path="/radios" element={<Radios />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <PlayerAudio />
      </Container>
    </main>
  );
};
