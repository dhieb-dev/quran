import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index"
import DataContext from "../context/DataContext"
import Values from "../context/Values";

export function Rewayahs() {
  const { passReciterId, setPassRewayah, currentLang, setSearch, resultSearch } = useContext(DataContext)
  const { setNameRewayah, setActiveComponent } = useContext(Values)
  const { data, loading, error } = useFetch(`https://mp3quran.net/api/v3/reciters?language=${currentLang}&reciter=${passReciterId}`)
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

  function moshafData(e) {
    setPassRewayah({ surahlist: e.target.dataset.surahlist, server: e.target.dataset.server });
    setActiveComponent("surahs")
    setNameRewayah(e.target.lastChild.textContent)
  }

  return (
    <div className="moshaf">
      {loading ?
        <Spinner className="spinner-riwayahs" /> :
        <div>
          {error ?
            <Error /> :
            rewayahs.map((moshaf, index) => (
              <ItemList
                key={index}
                index={index}
                item={moshaf}
                dataAttributes={{ surahlist: moshaf.surah_list, server: moshaf.server }}
                click={moshafData} />
            ))}
        </div>
      }
    </div >
  )
}
