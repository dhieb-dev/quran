import { useContext, useEffect, useState, useTransition } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index"
import {Context} from "../context/Context"

export function Rewayahs({ setActiveComponent }) {
  const { passReciter, setPassRewayah, currentLang, setSearch, resultSearch } = useContext(Context)
  const { data, loading, error } = useFetch(`https://mp3quran.net/api/v3/reciters?language=${currentLang}&reciter=${passReciter.id}`)
  const [rewayahs, setReawayahs] = useState()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (data) {
      startTransition(() => {
        setReawayahs(data.reciters[0].moshaf)
        setSearch(data.reciters[0].moshaf)
      })
    }
  }, [data, setSearch])

  useEffect(() => startTransition(() => setReawayahs(resultSearch)), [resultSearch])

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
      {isPending && <p>جاري تحديث القائمة...</p>}
    </>
  )
}
