import { useContext, useEffect, useRef, useState } from "react"
import { useFetch } from "../hooks";
import DataContext from "../context/DataContext";
import { language } from "../svgs/laguage";
const elementRoot = document.documentElement;
export function Langs() {
  const { currentLang, setcurrentLang } = useContext(DataContext)
  const [showList, setShowList] = useState(false);
  const btnRef = useRef()
  const { data } = useFetch("https://mp3quran.net/api/v3/languages")
  useEffect(() => {
    function anywhere(e) {
      if (e.target !== btnRef.current) {
        setShowList(false);
      }
    }
    elementRoot.addEventListener('click', anywhere)
    return () => {
      elementRoot.removeEventListener('click', anywhere)
    }
  }, [showList])
  return (
    <div dir="ltr" className="langs relative h-7" >
      <button ref={btnRef} onClick={() => setShowList(!showList)} className="flex items-center space-x-1" title="language">
        <span className="block text-xs">{currentLang.toUpperCase()}</span>
        {language.language}
      </button>
      {(showList && data) &&
        <ul className="h-[400px] overflow-y-auto absolute top-full right-0 p-2 rounded bg-teal-50 dark:bg-gray-900" >
          {data?.language.map(lang => <li key={lang.locale} onClick={() => setcurrentLang(lang.locale)} className="mb-1">{lang.language}</li>)}
        </ul>}
    </div>
  )
}