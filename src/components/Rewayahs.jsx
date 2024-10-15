import { useContext, useEffect, useState } from "react";
import { useElementInView, useFetch } from "../hooks/index";
import { Spinner } from "./index"
import DataContext from "../context/DataContext"
import Values from "../context/Values";

export function Rewayahs() {
  const { passReciterId, setPassRewayah, currentLang, setSearch, resultSearch } = useContext(DataContext)
  const { setNameRewayah, setActiveComponent } = useContext(Values)
  const { data, loading } = useFetch(`https://mp3quran.net/api/v3/reciters?language=${currentLang}&reciter=${passReciterId}`)
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
  const { targetRef } = useElementInView()
  return (
    <div className="moshaf">
      {
        loading ?
          <Spinner className="spinner-riwayahs" /> :
          <div>
            {
              rewayahs.map((moshaf, index) => (
                <button
                  ref={el => targetRef.current[index] = el}
                  key={index}
                  data-surahlist={moshaf.surah_list}
                  data-server={moshaf.server}
                  onClick={moshafData}
                  className="px-4 opacity-0 scale-50 duration-300 py-2 mb-2 w-full flex bg-backgroundItem bg-fixed bg-cover bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <span className="font-bold">{index + 1} -</span>
                  <span className="mx-4">{moshaf.name}</span>
                </button>
              ))}
          </div>
      }
    </div >
  )
}
