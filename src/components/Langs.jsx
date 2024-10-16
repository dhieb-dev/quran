import { useContext, useRef, useState } from "react";
import { useClickOutside, useFetch } from "../hooks";
import DataContext from "../context/DataContext";
import { language } from "../svgs/laguage";
export function Langs() {
  const { currentLang, setcurrentLang } = useContext(DataContext);
  const [showList, setShowList] = useState(false);
  const btnRef = useRef();
  const { data } = useFetch("https://mp3quran.net/api/v3/languages");
  useClickOutside(btnRef, () => {
    setShowList(false);
  });
  return (
    <div dir="ltr" className="langs h-7">
      <button ref={btnRef} onClick={() => setShowList(!showList)} className="flex items-center space-x-1" title="language">
        <span className="block text-xs">{currentLang.toUpperCase()}</span>
        {language.language}
      </button>
      {(showList && data) &&
        <ul className="h-[400px] overflow-y-auto absolute top-full right-10 z-10 p-2 rounded bg-zinc-50 dark:bg-zinc-700" >
          {data?.language.map(lang => <li key={lang.locale} onClick={() => setcurrentLang(lang.locale)} className="mb-1">{lang.language}</li>)}
        </ul>}
    </div>
  );
};