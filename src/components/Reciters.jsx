import { useContext, useEffect, useState, useTransition } from "react"
import { useFetch } from "../hooks/index"
import { Error, ItemList, Spinner } from "./index"
import {Context} from "../context/Context"

export function Reciters({ setActiveComponent }) {
  const { setPassReciter, currentLang, setSearch, resultSearch } = useContext(Context)
  const { data, loading, error } = useFetch(`https://mp3quran.net/api/v3/reciters?language=${currentLang}`)
  const [reciters, setReciters] = useState([])
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    if (data) {
      startTransition(() => {
        setReciters(data.reciters)
        setSearch(data.reciters)
      })
    }
  }, [data, setSearch])

  useEffect(() => startTransition(() => setReciters(resultSearch)), [resultSearch])

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
      {isPending && <p>جاري تحديث القائمة...</p>}
    </>
  )
}
