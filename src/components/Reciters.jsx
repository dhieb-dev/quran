import { useContext } from "react"
import { useFetch } from "../hooks/index"
import { Spinner } from "./index"
import DataContext from "../context/DataContext"

export function Reciters({ setNameReciter }) {
  const { setPassReciterId, setActiveComponent, currentLang } = useContext(DataContext)
  const { data, loading } = useFetch(`https://mp3quran.net/api/v3/reciters?language=${currentLang}`)
  // When Clicked  
  function getId(reciterId, nameReciter) {
    setPassReciterId(reciterId)
    setActiveComponent("rewayahs")
    setNameReciter(nameReciter)
  }

  return (
    <div className="reciters" >
      {
        loading ?
          <Spinner className="spinner-reciters" /> :
          <div className="flex justify-between flex-wrap">
            {
              data?.reciters.map((reciter, index) => (
                <button
                  key={reciter.id}
                  data-id={reciter.id}
                  onClick={() => getId(reciter.id, reciter.name)}
                  className="px-4 py-2 mb-2 w-full flex md:w-[48%] lg:w-[32%] bg-backgroundItem bg-fixed bg-cover bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <span className="p-1 w-6 h-6 ml-4 text-sm bg-gray-200 dark:bg-zinc-950 rounded-full grid place-content-center">{index + 1}</span>
                  <span>{reciter.name}</span>
                </button>
              ))
            }
          </div>
      }
    </div >
  )
}
