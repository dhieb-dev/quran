import { useContext, useEffect } from "react";
import { Reciters, Rewayahs, Surahs } from "../components";
import { Context } from "../context/Context";
import { useLocation } from "react-router-dom";
export function Quran() {
  const {
    activeComponent,
    setActiveComponent,
  } = useContext(Context);
  const location = useLocation();
  useEffect(() => {
    if (!(location === "/")) setActiveComponent("reciters");
  }, [location, setActiveComponent]);
  return (
    <section className="Quran">
      {activeComponent === "reciters" && (
        <Reciters setActiveComponent={setActiveComponent} />
      )}
      {activeComponent === "rewayahs" && (
        <Rewayahs setActiveComponent={setActiveComponent} />
      )}
      {activeComponent === "surahs" && (
        <Surahs setActiveComponent={setActiveComponent} />
      )}
    </section>
  );
}
