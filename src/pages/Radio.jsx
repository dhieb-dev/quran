import { useContext, useEffect, useState } from "react";
import { Spinner } from "../components/index"
import { useFetch } from "../hooks/useFetch";
import DataContext from "../context/DataContext";
import Values from "../context/Values";
export const Radio = () => {
  const { currentLang, setPassUrl, setSearch, resultSearch } = useContext(DataContext)
  const { setActiveComponent } = useContext(Values)
  const { data, loading } = useFetch(`https://mp3quran.net/api/v3/radios?language=${currentLang}`)
  const [radios, setRadios] = useState()

  useEffect(() => {
    if (data) {
      setRadios(data.radios)
      setSearch(data.radios)
    }
  }, [data, setSearch])
  useEffect(() => {
    setRadios(resultSearch)
  }, [resultSearch])
  useEffect(() => {
    setActiveComponent("reciters")
  }, [setActiveComponent])
  const handleClick = (e) => {
    setPassUrl(e.target);
  }
  return (
    <section>
      <div className="radios" >
        {loading ?
          <Spinner className="spinner-radio" /> :
          <div className="flex justify-between flex-wrap">
            {radios.map((radio, index) => (
              <button
                key={radio.id}
                data-url={radio.url}
                onClick={handleClick}
                className="px-4 py-2 mb-2 w-full flex md:w-[48%] lg:w-[32%] bg-backgroundItem bg-fixed bg-cover bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                <span className="p-1 w-6 h-6 ml-4 text-sm bg-gray-200 dark:bg-zinc-950 rounded-full grid place-content-center">{index + 1}</span>
                <span>{radio.name}</span>
              </button>
            ))}
          </div>}
      </div >
    </section>
  )
}
