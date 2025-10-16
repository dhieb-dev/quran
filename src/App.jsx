import { ContextProvider } from "./context/Context";
import { LayoutRoot } from "./layouts/index";
import "./App.css";
import { Route, Routes } from "react-router";
import { Langs, Msahfs, NotFound, QuranAudios, Radios } from "./pages";
import { AudiosContextProvider } from "./context/AudiosContext";

const App = () => {
  return (
    <ContextProvider>
      <AudiosContextProvider>
        <Routes>
          <Route element={<LayoutRoot />}>
            <Route path="/" element={<QuranAudios />} />
            <Route path="/radios" element={<Radios />} />
            <Route path="/mashafs" element={<Msahfs />} />
            <Route path="/languages" element={<Langs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AudiosContextProvider>
    </ContextProvider>
  );
};
export default App;
