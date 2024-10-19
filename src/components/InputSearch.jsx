import { useContext, useEffect, useRef } from "react";
import DataContext from "../context/DataContext";
import Values from "../context/Values";

export const InputSearch = () => {
  const { search, setResultSearch } = useContext(DataContext);
  const { activeComponent} = useContext(Values);
  const inputRef = useRef()
  useEffect(() => {
    if (activeComponent === "rewayahs" || "reciters" || "surahs") {
      inputRef.current.value = ""
    }
  }, [activeComponent])
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredResults = search.filter((el) =>
      el.name.toLowerCase().includes(query)
    );
    setResultSearch(filteredResults);
  };

  return (
    <div className="search mr-auto ml-0">
      <input
        ref={inputRef}
        className="border-2 border-slate-300 dark:border-slate-600 px-3 outline-none py-1 rounded-full bg-zinc-100 dark:bg-neutral-900"
        onChange={handleSearch}
        type="text"
        placeholder="البحث"
      />
    </div>
  );
};
