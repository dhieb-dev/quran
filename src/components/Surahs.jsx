import { useContext, useEffect, useState } from "react"
import { useElementInView, useFetch } from "../hooks/index"
import { ItemList, Spinner } from "./index"
import DataContext from "../context/DataContext"
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
  const { targetRef } = useElementInView()

  return (
    <div className="suwar">
      {loading ?
        <Spinner className="spinner-surahs" /> :
        <div className="flex justify-between flex-wrap">
          {surahs?.map((surah, index) => (
            <ItemList
              index={surah.id -1}
              key={index}
              ref={el => targetRef.current[index] = el}
              item={surah}
              dataAttributes={{ url: `${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3` }}
              click={surahData} />
          ))}
        </div>
      }
    </div>
  )
}
