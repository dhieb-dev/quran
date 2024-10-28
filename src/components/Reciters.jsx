import { useContext, useEffect, useState } from "react"
import { useFetch } from "../hooks/index"
import { Error, ItemList, Spinner } from "./index"
import DataContext from "../context/DataContext"

export function Reciters({ setActiveComponent }) {
  const { setPassReciter, currentLang, setSearch, resultSearch } = useContext(DataContext)
  const { data, loading, error } = useFetch(`https://mp3quran.net/api/v3/reciters?language=${currentLang}`)
  const [reciters, setReciters] = useState([])

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
    setPassReciter({ id: reciterId, name: reciterName })
    setActiveComponent("rewayahs")
  }
  return (
    <>
      {loading ?
        <Spinner /> :
        error ?
          <Error /> :
          <ul className="reciters grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reciters.map((reciter, index) => (
              <ItemList
                index={index}
                key={index}
                item={reciter}
                dataAttributes={reciter.id}
                click={() => getId(reciter.id, reciter.name)} />
            ))}
          </ul>
      }
    </>
  )
}
