import { useContext, useEffect, useState } from "react"
import { useFetch } from "../hooks/index"
import { Error, ItemList, Spinner } from "./index"
import DataContext from "../context/DataContext"
export function Surahs() {
  const { passRewayah, setPassUrl, nextOrPrev, currentLang, setSearch, resultSearch } = useContext(DataContext)
  const [surahs, setSurahs] = useState()
  const { data, loading, error } = useFetch(`https://mp3quran.net/api/v3/suwar?language=${currentLang}`)
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
    <>
      {loading ?
        <Spinner /> :
        error ?
          <Error /> :
          <div className="suwar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {surahs.map((surah, index) => (
              <ItemList
                index={surah.id}
                key={index}
                item={surah}
                dataAttributes={{ url: `${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3` }}
                click={surahData} />))
            }
          </div>
      }
    </>
  )
}
