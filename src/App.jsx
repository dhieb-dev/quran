import { ContextProvider } from "./context/Context";
import { PlayerAudio, LayoutRoot } from "./layouts/index";
import "./App.css";
import { Route, Routes } from "react-router";
import { Langs, Msahfs, Hadiths, NotFound, QuranAudios, Radios } from "./pages";

const App = () => {
  return (
    <ContextProvider>
      <Routes>
        <Route element={<LayoutRoot />}>
          <Route path="/" element={<QuranAudios />} />
          <Route path="/radios" element={<Radios />} />
          <Route path="/mashafs" element={<Msahfs />} />
          <Route path="/hadiths" element={<Hadiths />} />
          <Route path="/languages" element={<Langs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <PlayerAudio />
    </ContextProvider>
  );
};
export default App;
