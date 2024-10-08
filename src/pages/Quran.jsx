import { useContext, useState } from "react";
import { Reciters, Rewayahs, Surahs, TabSection } from "../components/index";
import DataContext from "../context/DataContext";
export function Quran() {
  const [nameReciter, setNameReciter] = useState("القارئ")
  const [nameRewayah, setNameRewayah] = useState("الرواية")
  const { activeComponent, setActiveComponent } = useContext(DataContext)
  return (
    <section className='Quran'>
      <nav className="py-2">
        <ul className="flex justify-around">
          <TabSection title={nameReciter} onClick={() => {
            setActiveComponent("reciters")
            setNameRewayah(null)
            }}/>
          {activeComponent !== "reciters" && (
            <TabSection title={nameRewayah} onClick={() => setActiveComponent("rewayahs")} />
          )}
        </ul>
      </nav>
      {activeComponent === "reciters" && <Reciters setNameReciter={setNameReciter} />}
      {activeComponent === "rewayahs" && <Rewayahs setNameRewayah={setNameRewayah}/>}
      {activeComponent === "surahs" && <Surahs />}
    </section>
  )
}