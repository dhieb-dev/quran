import { useContext } from "react";
import { InputSearch, Tabs } from "../components/index";
import Values from "../context/Values";

export const UpperBar = () => {
  const { activeComponent } = useContext(Values)
  return (
    <div className="flex justify-between items-center my-3">
      {activeComponent === "reciters" || "rewayahs" && <Tabs />}
      <InputSearch />
    </div>
  );
};