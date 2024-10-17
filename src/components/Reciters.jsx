import { useContext, useEffect, useState } from "react"
import { useElementInView, useFetch } from "../hooks/index"
import { ItemList, Spinner } from "./index"
import DataContext from "../context/DataContext"
import Values from "../context/Values"

export function Reciters() {
  const { setPassReciterId, currentLang, setSearch, resultSearch } = useContext(DataContext)
  const { setNameReciter, setActiveComponent } = useContext(Values)
  const { data, loading, error } = useFetch(`https://mp3quran.net/api/v3/reciters?language=${currentLang}`)
  const [reciters, setReciters] = useState()

  useEffect(() => {
    if (data) {
      setReciters(data.reciters)
      setSearch(data.reciters)
    }
    console.log(error);
  }, [data, setSearch, error])

  useEffect(() => {
    setReciters(resultSearch)
  }, [resultSearch])

  // When Clicked  
  function getId(reciterId, reciterName) {
    setPassReciterId(reciterId)
    setActiveComponent("rewayahs")
    setNameReciter(reciterName)
  }
  const { targetRef } = useElementInView()
  return (
    <div className="reciters" >
      {loading ?
        <Spinner className="spinner-reciters" /> :
        <div className="flex justify-between flex-wrap">
          {reciters?.map((reciter, index) => (
            <ItemList
              index={index}
              key={index}
              ref={el => targetRef.current[index] = el}
              item={reciter}
              dataAttributes={reciter.id}
              click={() => getId(reciter.id, reciter.name)} />
          ))}
        </div>
      }
    </div >
  )
}
