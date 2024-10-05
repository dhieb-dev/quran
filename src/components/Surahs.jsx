import { useContext, useEffect, useState } from "react"
import { useFetch } from "../hooks/index"
import { Spinner } from "./index"
import DataContext from "../context/DataContext"
export function Surahs() {
  const { passRewayah, setpassUrl, nextOrPrev, currentLang } = useContext(DataContext)
  const [surahsList, setSurahsList] = useState()
  const { data, loading } = useFetch(`https://mp3quran.net/api/v3/suwar?language=${currentLang}`)
  useEffect(() => {
    if (data && passRewayah) setSurahsList(passRewayah.dataset.surahlist.split(",").map(item => data?.suwar.find(surah => surah.id === +item)))
    return () => setSurahsList(false)
  }, [data, passRewayah])

  // when clicked an item from the list
  function surahData(e) {
    setpassUrl(e.target)
  }
  // Event Btns Next And Prev
  useEffect(() => {
    setpassUrl(nextOrPrev);
  }, [nextOrPrev, setpassUrl])
  return (
    <div className="suwar">
      {
        loading ?
          <Spinner className="spinner-surahs" /> :
          <div className="flex justify-between flex-wrap">
            {
              surahsList?.map(surah => {
                return (
                  <button
                    key={surah.id}
                    data-url={`${passRewayah.dataset.server}${String(surah.id).padStart(3, "0")}.mp3`}
                    onClick={surahData}
                    className="flex justify-between items-center px-4 py-2 mb-2 w-full md:w-[48%] lg:w-[32%] bg-backgroundItem bg-fixed bg-cover bg-gray-50 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                    <span className="p-1 h-full aspect-square text-sm bg-gray-200 dark:bg-zinc-950 rounded-full">{surah.id}</span> 
                    <span>{surah.name}</span>
                    <a download={surah.name} href={`${passRewayah.dataset.server}${String(surah.id).padStart(3, "0")}.mp3`}>
                      <svg className="w-6 hover:[&_path]:bg-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="stroke-gray-800 dark:stroke-gray-200" d="M5.25589 16C3.8899 15.0291 3 13.4422 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.0582 20.206 15.4339 19 16.2417M12 21V11M12 21L9 18M12 21L15 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </a>
                  </button>
                )
              })}
          </div>
      }
    </div>
  )
}
