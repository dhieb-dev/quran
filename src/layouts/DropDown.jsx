import { useRef, useState } from "react";
import { useClickAnywhere } from "../hooks";

export const DropDown = ({ optionsArray, initialValue, optionTask, width }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initial, setInitial] = useState(null);
  const btn = useRef(null);
  useClickAnywhere(btn, () => isOpen && setIsOpen(false));

  return (
    <div className={`relative ${width ?? "w-24"}`}>
      <button
        ref={btn}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-100 dark:bg-gray-900 w-full py-1 rounded-lg"
      >
        {initial ?? initialValue}
      </button>
      {isOpen && (
        <div className="options absolute top-full left-0 right-0 mt-3 h-96 overflow-auto">
          {optionsArray.map((option, index) => (
            <button
              key={index}
              className="block bg-blue-100 dark:bg-gray-800 w-full mb-1 py-1 rounded-lg"
              onClick={() => {
                setInitial(option.name);
                optionTask(option);
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
