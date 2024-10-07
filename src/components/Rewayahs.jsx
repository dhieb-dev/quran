import { useContext } from "react";
import { useFetch } from "../hooks/index";
import { Spinner } from "./index"
import DataContext from "../context/DataContext"

export function Rewayahs({setNameRewayah}) {
  const { passReciterId, setPassRewayah, setActiveComponent, currentLang } = useContext(DataContext)
  const { data, loading } = useFetch(`https://mp3quran.net/api/v3/reciters?language=${currentLang}&reciter=${passReciterId}`)

  function moshafData(e) {
    setPassRewayah({surahlist: e.target.dataset.surahlist, server: e.target.dataset.server});
    setActiveComponent("surahs")
    setNameRewayah(e.target.lastChild.textContent)
  }

  return (
    <div className="moshaf">
      {
        loading ?
          <Spinner className="spinner-riwayahs" /> :
          <div>
            {
              data?.reciters[0].moshaf.map((moshaf, index) => (
                <div
                  key={index}
                  data-surahlist={moshaf.surah_list}
                  data-server={moshaf.server}
                  onClick={moshafData}
                  className="px-4 py-2 mb-2 w-full bg-backgroundItem bg-fixed bg-cover bg-gray-50 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  {index + 1} - <span>{moshaf.name}</span>
                </div>
              ))}
          </div>
      }
    </div >
  )
}
