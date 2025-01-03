import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context/Context";
import { useClickOutside } from "../hooks";
import { searchIcon } from "../svgs/search";
export const InputSearch = () => {
  const [input, setInput] = useState("");
  const [btnSearch, setBtnSearch] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);
  const { search, setFindedItem } = useContext(Context);

  const inputRef = useRef();
  const btnRef = useRef();
  useClickOutside(btnRef, (e) => {
    if (btnSearch && e.target !== inputRef.current) {
      setBtnSearch(false)
      setInput("")
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
    <div className="absolute left-0 md:relative text-sm">
      <div
        className={`flex border-2 rounded-full bg-zinc-100 dark:bg-neutral-900 ${
          btnSearch ? "border-slate-500 dark:border-slate-400 " : ""
        }`}
      >
        {btnSearch && (
          <input
            autoFocus
            value={input}
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
            className="px-3 py-1 w-40 animate-scale"
            type="text"
            placeholder="البحث"
          />
        )}
        <button
          ref={btnRef}
          onClick={() => setBtnSearch(!btnSearch)}
          className="px-2 py-1 w-9 h-9"
        >
          {searchIcon.search}
        </button>
      </div>
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
