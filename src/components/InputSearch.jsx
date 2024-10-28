import { useContext, useRef } from "react";
import DataContext from "../context/DataContext";

export const InputSearch = () => {
  const { search, setResultSearch, currentLang } = useContext(DataContext);
  const inputRef = useRef()
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredResults = search.filter((el) =>
      el.name.toLowerCase().includes(query)
    );
    setResultSearch(filteredResults);
  };

  return (
    <div className="search">
      <input
        ref={inputRef}
        className="border-2 border-slate-300 dark:border-slate-600 px-3 outline-none py-1 rounded-full bg-zinc-100 dark:bg-neutral-900"
        onChange={handleSearch}
        type="text"
        placeholder={ currentLang === "ar" ? "البحث" : "Search"}
      />
    </div>
  );
};
