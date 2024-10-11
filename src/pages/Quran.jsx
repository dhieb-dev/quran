import { useContext, useState } from "react";
import { InputSearch, Reciters, Rewayahs, Surahs, TabSection } from "../components/index";
import DataContext from "../context/DataContext";
export function Quran() {
  const [nameReciter, setNameReciter] = useState("القارئ")
  const [nameRewayah, setNameRewayah] = useState("الرواية")
  const { activeComponent, setActiveComponent } = useContext(DataContext)
  return (
    <section className='Quran'>
      <div className="flex justify-between items-center mb-4">
        <nav className="py-2">
          <ul className="text-sm flex justify-around space-x-3 space-x-reverse">
            <TabSection title={nameReciter} onClick={() => {
              setActiveComponent("reciters")
              setNameRewayah(null)
            }} />
            {activeComponent !== "reciters" && <TabSection title={nameRewayah} onClick={() => setActiveComponent("rewayahs")} />}
          </ul>
        </nav>
        <InputSearch />
      </div>
      {activeComponent === "reciters" && <Reciters setNameReciter={setNameReciter} />}
      {activeComponent === "rewayahs" && <Rewayahs setNameRewayah={setNameRewayah} />}
      {activeComponent === "surahs" && <Surahs />}
    </section>
  )
}