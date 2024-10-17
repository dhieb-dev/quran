import { useContext, useEffect, useState } from "react";
import { ItemList, Spinner } from "../components/index"
import { useFetch } from "../hooks/useFetch";
import DataContext from "../context/DataContext";
import Values from "../context/Values";
import { useElementInView } from "../hooks";
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
  const { targetRef } = useElementInView()

  return (
    <section>
      <div className="radios" >
        {loading ?
          <Spinner className="spinner-radio" /> :
          <div className="flex justify-between flex-wrap">
            {radios.map((radio, index) => (
              <ItemList
                index={index}
                key={index}
                ref={el => targetRef.current[index] = el}
                item={radio}
                dataAttributes={{ url: radio.url }}
                click={handleClick} />
            ))}
          </div>}
      </div>
    </section>
  )
}
