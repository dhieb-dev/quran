import { Route, Routes, useLocation } from "react-router-dom";
import { Quran, Radio, BrowseQuran } from '../pages/index';
import { NotFound } from '../components/index';
import { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import Values from "../context/Values";
import { UpperBar } from "./UpperBar";
export const Main = () => {
  const [activeComponent, setActiveComponent] = useState("reciters")
  const [nameReciter, setNameReciter] = useState(null)
  const [nameRewayah, setNameRewayah] = useState(null)
  const { currentLang } = useContext(DataContext)
  const location = useLocation()
  return (
    <main dir={`${currentLang === "eng" ? "ltr" : "rtl"}`} className="relative pb-20">
      <Values.Provider
        value={{
          activeComponent,
          setActiveComponent,
          nameReciter,
          setNameReciter,
          nameRewayah,
          setNameRewayah
        }}>
        { location.pathname !== '/browse_quran' && <UpperBar />}
        <Routes>
          <Route path='/' element={<Quran />} />
          <Route path='/radio' element={<Radio />} />
          <Route path='/browse_quran' element={<BrowseQuran />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Values.Provider>
    </main>
  );
};