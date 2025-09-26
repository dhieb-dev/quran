import { useEffect, useState } from "react";

export const Search = ({ getSearchArr, setResult }) => {
  const [input, setInput] = useState("");
  const [searchArr, setSearchArr] = useState(getSearchArr);
  useEffect(() => {
    if (input) {
      // if (searchArr)
      setResult(searchArr.filter((item) => item.name.includes(input)));
    } else {
      setResult();
    }
  }, [input, setResult, searchArr]);

  return (
    <div className="relative my-3">
      <input
        className="px-3 w-48 py-1 bg-white dark:bg-slate-950 rounded-lg focus:outline-none border"
        type="text"
        placeholder="بحث"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};
