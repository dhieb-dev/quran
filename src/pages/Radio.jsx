import { useContext } from "react";
import {Spinner} from "../components/index"
import {useFetch} from "../hooks/useFetch";
import DataContext from "../context/DataContext";
export const Radio = () => {
  const {currentLang, setpassUrl} = useContext(DataContext)
  const {data, loading} = useFetch(`https://mp3quran.net/api/v3/radios?language=${currentLang}`)
  const handleClick = (e) => {
    setpassUrl(e.target);
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
                  <div
                    key={radio.id}
                    data-url={radio.url}
                    onClick={handleClick}
                    className="px-4 py-2 mb-2 cursor-pointer w-full md:w-[48%] lg:w-[32%] bg-backgroundItem bg-fixed bg-cover bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                    {index + 1} - <span>{radio.name}</span>
                  </div>
                ))
              }
            </div>
        }
      </div >
    </section>
  )
}
