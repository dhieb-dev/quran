import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context/Context";
import { useClickOutside } from "../hooks";

export const InputSearch = () => {
  const [input, setInput] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  const { search, setFindedItem } = useContext(Context);

  const inputRef = useRef();
  useClickOutside(inputRef, () => {
    if (!(input === "")) {
      setInput("");
    }
  });

  useEffect(() => {
    if (search && input) {
      const filteredResults = search.filter((el) =>
        el.name.toLowerCase().includes(input)
      );
      setResultSearch(filteredResults);
    } else {
      setResultSearch();
    }
  }, [input, search, setResultSearch]);

  return (
    <div className="search relative">
      <input
        value={input}
        ref={inputRef}
        className="border-2 border-slate-300 focus:border-sky-200 focus:dark:border-red-200 dark:border-slate-600 px-3 outline-none py-1 rounded-full bg-zinc-100 dark:bg-neutral-900"
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="البحث"
      />
      {input && (
        <ul className="absolute z-10 max-h-96 overflow-y-auto text-sm mt-1 top-full w-full bg-gray-100 dark:bg-black rounded-lg space-y-2">
          {resultSearch?.length === 0 ? (
            <div>لا يوجد</div>
          ) : (
            resultSearch?.map((item, index) => (
              <li
                key={index}
                className="py-1 px-2 hover:bg-red-300 hover:dark:bg-blue-400"
                onClick={() => setFindedItem(item.id)}
              >
                {item.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
