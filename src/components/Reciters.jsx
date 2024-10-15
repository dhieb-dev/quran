import { useContext, useEffect, useState } from "react"
import { useElementInView, useFetch } from "../hooks/index"
import { Spinner } from "./index"
import DataContext from "../context/DataContext"
import Values from "../context/Values"

export function Reciters() {
  const { setPassReciterId, currentLang, setSearch, resultSearch } = useContext(DataContext)
  const { setNameReciter, setActiveComponent } = useContext(Values)
  const { data, loading } = useFetch(`https://mp3quran.net/api/v3/reciters?language=${currentLang}`)
  const [reciters, setReciters] = useState()

  useEffect(() => {
    if (data) {
      setReciters(data.reciters)
      setSearch(data.reciters)
    }
  }, [data, setSearch])

  useEffect(() => {
    setReciters(resultSearch)
  }, [resultSearch])

  // When Clicked  
  function getId(reciterId, reciterName) {
    setPassReciterId(reciterId)
    setActiveComponent("rewayahs")
    setNameReciter(reciterName)
  }
  const {targetRef} = useElementInView()
  return (
    <div className="reciters" >
      {loading ?
        <Spinner className="spinner-reciters" /> :
        <div className="flex justify-between flex-wrap">
          {reciters?.map((reciter, index) => (
            <button
              ref={el => targetRef.current[index] = el}
              key={reciter.id}
              data-id={reciter.id}
              onClick={() => getId(reciter.id, reciter.name)}
              className="px-4 opacity-0 scale-50 mt-10 duration-300 py-2 mb-2 w-full flex md:w-[48%] lg:w-[32%] bg-backgroundItem bg-fixed bg-cover bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              <span className="font-bold">{index + 1} - </span>
              <span className="mx-4">{reciter.name}</span>
            </button>))
          }
        </div>
      }
    </div >
  )
}
