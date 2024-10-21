import { useContext, useEffect, useState } from "react";
import { Error, Spinner, } from "../components";
import { useFetch } from "../hooks";
import DataContext from "../context/DataContext";

export const BrowseQuran = () => {
  const { currentLang } = useContext(DataContext)
  const [namesSuwar, setNamesSuwar] = useState([])
  const [startPage, setStartPage] = useState(1)
  const { data, loading, error } = useFetch(`https://mp3quran.net/api/v3/suwar?language=${currentLang}`)

  useEffect(() => {
    if (data) setNamesSuwar(data.suwar);
  }, [data, namesSuwar])
  function getPages(e) {
    const startPageNum = e.target.options[e.target.selectedIndex].value;
    setStartPage(startPageNum)
  }
  return (
    <section className="browse-quran" >
      {loading ?
        <Spinner className="spinner-browse-quran" /> :
        error ?
          <Error /> :
          <div>
            <select className="py-1 px-2 cursor-pointer outline-none bg-slate-100 dark:bg-slate-800 border-2 border-sky-200 dark:border-zinc-200 rounded" onChange={getPages}>
              {namesSuwar.map((surah) => <option key={surah.id} value={surah.start_page}>{surah.name}</option>)}
            </select>
            <div className="photo-gellory my-4 w-full grid place-content-center">
              <img className="p-2 rounded w-[400px] bg-slate-50" src={`https://maknoon.com/quran/hafs/${startPage}.svgz`} alt="" />
            </div>              
            <div className="flex justify-center space-x-4 space-x-reverse">
              <button onClick={() => setStartPage(prev => prev === 1 ? 604 : prev - 1)} className="w-6 h-6 bg-red-400 rounded-full p-[1px]"><img src="https://maknoon.com/quran/back.svg" alt="" /></button>
              <span>{startPage}</span>
              <button  onClick={() => setStartPage(prev => prev === 604 ?  1 : prev + 1)} className="w-6 h-6 bg-red-400 rounded-full p-[1px]"><img src="https://maknoon.com/quran/forward.svg" alt="" /></button>
            </div>
          </div>
      }
    </section >
  );
};