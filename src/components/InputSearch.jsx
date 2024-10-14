import { useContext, useEffect, useRef } from "react";
import DataContext from "../context/DataContext";

export const InputSearch = () => {
  const { activeComponent, search, setResultSearch } = useContext(DataContext);
  const inputRef = useRef()
  useEffect(() => {
    if (activeComponent === "rewayahs" || "reciters" || "surahs") {
      inputRef.current.value = ""
    }
  }, [activeComponent, setResultSearch])
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
        className="border-2 border-gray-500 dark:border-gray-200 px-3 outline-none py-1 rounded-full bg-zinc-100 dark:bg-zinc-900"
        onChange={handleSearch}
        type="text"
        placeholder="البحث"
      />
    </div>
  );
};
