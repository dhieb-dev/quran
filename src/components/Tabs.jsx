import { useContext } from "react";
import Values from "../context/Values";

export const Tabs = () => {
  const { setActiveComponent, nameReciter, nameRewayah, setNameRewayah } = useContext(Values)
  return (
    <nav>
      <ul className="text-sm flex justify-around space-x-3 space-x-reverse">
        <li title={nameReciter} onClick={() => {
          setActiveComponent("reciters")
          setNameRewayah(null)
        }}>
          {nameReciter}
        </li>
        <li title={nameRewayah} onClick={() => {
          setActiveComponent("rewayahs")
          setNameRewayah(null)
        }}>
          {nameRewayah}
        </li>
      </ul>
    </nav>
  );
};