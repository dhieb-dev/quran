import { useContext, useEffect } from "react";
import { Reciters, Rewayahs, Surahs } from "../components";
import {Context} from "../context/Context";
export function Quran() {
  const {activeComponent, setActiveComponent} = useContext(Context)
  useEffect(() => {
    if (!(window.location.pathname === '/')) setActiveComponent('reciters')
  })
  return (
    <section className='Quran'>
      {activeComponent === "reciters" && <Reciters setActiveComponent={setActiveComponent}/>}
      {activeComponent === "rewayahs" && <Rewayahs setActiveComponent={setActiveComponent}/>}
      {activeComponent === "surahs" && <Surahs setActiveComponent={setActiveComponent}/>}
    </section>
  )
}