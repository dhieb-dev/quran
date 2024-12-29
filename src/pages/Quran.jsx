import { useContext } from "react";
import { Reciters, Rewayahs, Surahs } from "../components";
import { Context } from "../context/Context";
export function Quran() {
  const { activeComponent } = useContext(Context);
  return (
    <section className="Quran">
      {activeComponent === "reciters" && <Reciters />}
      {activeComponent === "rewayahs" && <Rewayahs />}
      {activeComponent === "surahs" && <Surahs />}
    </section>
  );
}
