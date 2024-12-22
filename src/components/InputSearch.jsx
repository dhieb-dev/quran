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
    <div className="relative text-sm">
      <input
        value={input}
        ref={inputRef}
        className="px-1.5 py-0.5 w-32 md:w-40 border-2 border-slate-300 focus:border-sky-200 focus:dark:border-red-200 dark:border-slate-600 rounded-full bg-zinc-100 dark:bg-neutral-900"
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="البحث"
      />
      {input && (
        <ul className="absolute z-10 max-h-96 overflow-y-auto mt-1 top-full w-full bg-gray-100 dark:bg-black rounded-lg space-y-2">
          {resultSearch?.length === 0 ? (
            <div>لا يوجد</div>
          ) : (
            resultSearch?.map((item, index) => (
              <li
                key={index}
                className="py-1 px-1.5 hover:bg-red-200 hover:dark:bg-blue-300"
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
