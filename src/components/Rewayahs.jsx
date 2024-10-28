import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index"
import DataContext from "../context/DataContext"

export function Rewayahs({setActiveComponent}) {
  const { passReciter, setPassRewayah, currentLang, setSearch, resultSearch } = useContext(DataContext)
  const { data, loading, error } = useFetch(`https://mp3quran.net/api/v3/reciters?language=${currentLang}&reciter=${passReciter.id}`)
  const [rewayahs, setReawayahs] = useState()

  useEffect(() => {
    if (data) {
      setReawayahs(data.reciters[0].moshaf)
      setSearch(data.reciters[0].moshaf)
    }
  }, [data, setSearch])

  useEffect(() => {
    setReawayahs(resultSearch)
  }, [resultSearch])
  function moshafData(surahlist, server, name) {
    setPassRewayah({ surahlist, server, name });
    setActiveComponent("surahs")
  }

  return (
    <>
      {loading ?
        <Spinner /> :
        error ?
          <Error /> :
          <ul>
            {rewayahs.map((moshaf, index) => (
              <ItemList
                key={index}
                index={index}
                item={moshaf}
                dataAttributes={{ surahlist: moshaf.surah_list, server: moshaf.server }}
                click={(e) => moshafData(e.target.dataset.surahlist, e.target.dataset.server, e.target.lastChild.textContent)} />
            ))}
          </ul>
      }
    </>
  )
}
