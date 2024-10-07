import { useContext } from "react"
import { useFetch } from "../hooks/index"
import { Spinner } from "./index"
import DataContext from "../context/DataContext"

export function Reciters({setNameReciter}) {
  const { setpassReciterId, setActiveComponent, currentLang } = useContext(DataContext)
  const { data, loading } = useFetch(`https://mp3quran.net/api/v3/reciters?language=${currentLang}`)
  // When Clicked  
  function getId(reciterId, nameReciter) {
    setpassReciterId(reciterId)
    setActiveComponent("rewayahs")
    setNameReciter(nameReciter)
  }

  return (
    <div className="reciters" >
      {
        loading ?
          <Spinner className="spinner-reciters"/> :
          <div className="flex justify-between flex-wrap">
            {
              data?.reciters.map((reciter, index) => (
                <button
                  key={reciter.id}
                  data-id={reciter.id}
                  onClick={() => getId(reciter.id, reciter.name)}
                  className="px-4 py-2 mb-2 w-full md:w-[48%] lg:w-[32%] bg-backgroundItem bg-fixed bg-cover bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  {index + 1} - <span>{reciter.name}</span>
                </button>
              ))
            }
          </div>
      }
    </div >
  )
}
