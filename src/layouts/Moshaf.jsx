import { useState, useContext } from "react";
import Context from "../context/Context";
import { DropDown } from "./DropDown";

export const Moshaf = () => {
  const { reciterData, setMoshafData } = useContext(Context);
  const [selectedMoshaf, setSelectedMoshaf] = useState(reciterData?.moshaf[0]);
  const handleSelect = (moshaf) => {
    setMoshafData(moshaf);
    setSelectedMoshaf(moshaf);
  };
  return (
    <div className="relative text-sm">
      <DropDown
        initialValue={selectedMoshaf?.name}
        optionsArray={reciterData?.moshaf}
        optionTask={(moshaf, index) => handleSelect(moshaf, index)}
        width="w-40"
      />
    </div>
  );
};
