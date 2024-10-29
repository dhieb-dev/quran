import { useContext, useEffect, useState, useTransition } from "react";
import { Error, ItemList, Spinner } from "../components/index"
import { useFetch } from "../hooks/useFetch";
import DataContext from "../context/DataContext";
export const Radio = () => {
  const { currentLang, setPassAudio, setSearch, resultSearch } = useContext(DataContext)
  const { data, loading, error } = useFetch(`https://mp3quran.net/api/v3/radios?language=${currentLang}`)
  const [radios, setRadios] = useState()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (data) {
      startTransition(() => {
        setRadios(data.radios)
        setSearch(data.radios)
      })
    }
  }, [data, setSearch])
  
  useEffect(() => startTransition(() => setRadios(resultSearch)), [resultSearch])

  const handleClick = (e) => {
    setPassAudio(e.target);
  }

  return (
    <section>
      <div className="radios" >
        {loading ?
          <Spinner className="spinner-radio" /> :
          error ?
            <Error /> :
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {radios.map((radio, index) => (
                <ItemList
                  index={index}
                  key={index}
                  item={radio}
                  dataAttributes={{ url: radio.url }}
                  click={handleClick} />))
              }
            </ul>
        }
        {isPending && <p>جاري تحديث القائمة...</p>}
      </div>
    </section>
  )
}
