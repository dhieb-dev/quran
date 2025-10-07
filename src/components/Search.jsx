import { useEffect, useState } from "react";

export const Search = ({ getSearchArr, setResult }) => {
  const [input, setInput] = useState("");
  const [searchArr, setSearchArr] = useState(getSearchArr);
  useEffect(() => {
    if (input) {
      setResult(searchArr.filter((item) => item.name.includes(input)));
    } else {
      setResult();
    }
  }, [input, setResult, searchArr]);

  return (
    <div className="relative my-3">
      <input
        className="px-3 w-48 py-1 bg-slate-100 dark:bg-black/90 rounded-md border-2 focus:outline-none focus:border-sky-200 dark:focus:border-sky-900  border-slate-300 dark:border-slate-900"
        type="search"
        placeholder="بحث"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};
