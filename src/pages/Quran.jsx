import { useContext } from "react";
import { Reciters, Rewayahs, Surahs } from "../components/index";
import DataContext from "../context/DataContext";
export function Quran() {
  const { passReciter, passRewayah, activeComponent, setActiveComponent } = useContext(DataContext)
  const listTabs = [
    { target: passReciter, active: "reciters" },
    { target: passRewayah, active: "rewayahs" },
  ]
  return (
    <section className='Quran'>
      <nav>
        <ul className="py-4 text-sm flex items-end space-x-2 space-x-reverse">
          {listTabs.map(({ target, active }) => (
            target &&
            <li
              key={active}
              onClick={() => setActiveComponent(active)}
              className="py-1 px-2 hover:text-gray-500 hover:dark:text-sky-300">
              - {target.lastChild.textContent}
            </li>
          ))}
        </ul>
      </nav>
      {activeComponent === "reciters" && <Reciters />}
      {activeComponent === "rewayahs" && <Rewayahs />}
      {activeComponent === "surahs" && <Surahs />}
    </section>
  )
}