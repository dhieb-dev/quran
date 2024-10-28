import { useContext } from "react";
import { Reciters, Rewayahs, Surahs } from "../components";
import DataContext from "../context/DataContext";
export function Quran() {
  const {activeComponent, setActiveComponent} = useContext(DataContext)
  return (
    <section className='Quran'>
      {activeComponent === "reciters" && <Reciters setActiveComponent={setActiveComponent}/>}
      {activeComponent === "rewayahs" && <Rewayahs setActiveComponent={setActiveComponent}/>}
      {activeComponent === "surahs" && <Surahs setActiveComponent={setActiveComponent}/>}
    </section>
  )
}