import { useContext, useEffect } from "react";
import { Spinner } from "../components/index"
import { useFetch } from "../hooks/useFetch";
import DataContext from "../context/DataContext";
export const Radio = () => {
  const { currentLang, setPassUrl , setActiveComponent} = useContext(DataContext)
  const { data, loading } = useFetch(`https://mp3quran.net/api/v3/radios?language=${currentLang}`)
  useEffect(() => {
    setActiveComponent("reciters")
  }, [setActiveComponent])
  const handleClick = (e) => {
    setPassUrl(e.target);
  }
  return (
    <section>
      <div className="radios p-10" >
        {
          loading ?
            <Spinner className="spinner-radio" /> :
            <div className="flex justify-between flex-wrap">
              {
                data?.radios.map((radio, index) => (
                  <button
                    key={radio.id}
                    data-url={radio.url}
                    onClick={handleClick}
                    className="px-4 py-2 mb-2 cursor-pointer flex w-full md:w-[48%] lg:w-[32%] bg-backgroundItem bg-fixed bg-cover bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                    <span className="p-1 w-6 h-6 ml-4 text-sm bg-gray-200 dark:bg-zinc-950 rounded-full grid place-content-center">{index + 1}</span>
                    <span>{radio.name}</span>
                  </button>
                ))
              }
            </div>
        }
      </div >
    </section>
  )
}
