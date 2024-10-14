import { useContext } from "react";
import { Reciters, Rewayahs, Surahs } from "../components/index";
import Values from "../context/Values";
export function Quran() {
  const { activeComponent } = useContext(Values)
  return (
    <section className='Quran'>
      {activeComponent === "reciters" && <Reciters />}
      {activeComponent === "rewayahs" && <Rewayahs />}
      {activeComponent === "surahs" && <Surahs />}
    </section>
  )
}