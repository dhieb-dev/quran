import { useContext, useEffect, useState, useTransition } from "react"
import { useFetch } from "../hooks/index"
import { Error, ItemList, Spinner } from "./index"
import DataContext from "../context/DataContext"
export function Surahs() {
  const { passRewayah, setPassAudio, currentLang, setSearch, resultSearch } = useContext(DataContext)
  const [surahs, setSurahs] = useState()
  const { data, loading, error } = useFetch(`https://mp3quran.net/api/v3/suwar?language=${currentLang}`)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (data && passRewayah) {
      startTransition(() => {
        const surahsFilter = passRewayah.surahlist.split(",").map(item => data?.suwar.find(surah => surah.id === +item))
        setSurahs(surahsFilter)
        setSearch(surahsFilter)
      })
    }
  }, [data, passRewayah, setSearch])
  
  useEffect(() => startTransition(() => setSurahs(resultSearch)), [resultSearch])

  // when clicked an item from the list
  function surahData(e) {
    setPassAudio(e.target)
  }

  return (
    <>
      {loading ?
        <Spinner /> :
        error ?
          <Error /> :
          <ul className="suwar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {surahs.map((surah, index) => (
              <ItemList
                index={surah.id}
                key={index}
                item={surah}
                dataAttributes={{ url: `${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3`, startpage: surah.start_page }}
                click={surahData} />))
            }
          </ul>
      }
      {isPending && <p>جاري تحديث القائمة...</p>}
    </>
  )
}
