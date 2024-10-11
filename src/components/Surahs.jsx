import { useContext, useEffect, useState } from "react"
import { useFetch } from "../hooks/index"
import { Spinner } from "./index"
import DataContext from "../context/DataContext"
import { downlod } from "../svgs/download"
export function Surahs() {
  const { passRewayah, setPassUrl, nextOrPrev, currentLang, setSearch, resultSearch } = useContext(DataContext)
  const [surahs, setSurahs] = useState()
  const { data, loading } = useFetch(`https://mp3quran.net/api/v3/suwar?language=${currentLang}`)
  useEffect(() => {
    if (data && passRewayah) {
      const surahsFilter = passRewayah.surahlist.split(",").map(item => data?.suwar.find(surah => surah.id === +item))
      setSurahs(surahsFilter)
      setSearch(surahsFilter)
    }
  }, [data, passRewayah, setSearch])
  useEffect(() => {
    setSurahs(resultSearch)
  }, [resultSearch])
  // when clicked an item from the list
  function surahData(e) {
    setPassUrl(e.target)
  }
  // Event Btns Next And Prev
  useEffect(() => {
    setPassUrl(nextOrPrev);
  }, [nextOrPrev, setPassUrl])
  return (
    <div className="suwar">
      {
        loading ?
          <Spinner className="spinner-surahs" /> :
          <div className="flex justify-between flex-wrap">
            {
              surahs?.map(surah => {
                return (
                  <button
                    key={surah.id}
                    data-url={`${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3`}
                    onClick={surahData}
                    className="flex justify-between items-center px-4 py-2 mb-2 w-full md:w-[48%] lg:w-[32%] bg-backgroundItem bg-fixed bg-cover bg-gray-50 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                    <span className="p-1 w-6 h-6 text-sm bg-gray-200 dark:bg-zinc-950 rounded-full grid place-content-center">{surah.id}</span> 
                    <span>{surah.name}</span>
                    <a download={surah.name} href={`${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3`}>
                      {downlod.downlod}
                    </a>
                  </button>
                )
              })}
          </div>
      }
    </div>
  )
}
