import { useContext, useEffect, useState } from "react";
import { Error, Spinner, } from "../components";
import { useFetch } from "../hooks";
import { Context } from "../context/Context";
export const BrowseQuran = () => {
  const { currentLang } = useContext(Context)
  const [namesSuwar, setNamesSuwar] = useState([])
  const [startPage, setStartPage] = useState(1)
  const [rewayah, setRewayah] = useState("hafs")
  const { data, loading, error } = useFetch(`https://mp3quran.net/api/v3/suwar?language=${currentLang}`)

  useEffect(() => {
    if (data) setNamesSuwar(data.suwar);
  }, [data, namesSuwar])

  function getPages(e) {
    const startPageNum = e.target.options[e.target.selectedIndex].value;
    setStartPage(startPageNum)
  }
  function getRewayah(e) {
    const selectedewayah = e.target.options[e.target.selectedIndex].value;
    setRewayah(selectedewayah)
  }
  const riwayat = [
    { name: "حفص عن عاصم", value: "hafs" },
    { name: "دوري عن أبي عمرو", value: "douri" },
    { name: "قالون عن نافع", value: "qalon" },
    { name: "شعبة عن عاصم", value: "shubah" },
    { name: "ورش عن نافع", value: "warsh" },
  ]
  return (
    <>
      {loading ?
        <Spinner className="spinner-browse-quran" /> :
        error ?
          <Error /> :
          <section className="browse-quran" >
            <div className="selects flex ">
              <select className="py-1 px-2 mx-2 cursor-pointer outline-none bg-slate-100 dark:bg-slate-800 border-2 border-sky-200 dark:border-zinc-200 rounded" onChange={getPages}>
                {namesSuwar.map((surah) => <option key={surah.id} value={surah.start_page}>{surah.name}</option>)}
              </select>
              <select className="py-1 px-2 mx-2 cursor-pointer outline-none bg-slate-100 dark:bg-slate-800 border-2 border-sky-200 dark:border-zinc-200 rounded" onChange={getRewayah}>
                {riwayat.map((rewayah, index) => <option key={index} value={rewayah.value}>{rewayah.name}</option>)}
              </select>
            </div>
            <div className="photo-gellory my-4 min-h-[520px] w-full flex justify-center ">
              <img className="p-2 rounded w-[600px] bg-slate-50" src={`https://maknoon.com/quran/${rewayah}/${startPage}.svgz`} alt="" />
            </div>
            <div dir="rtl" className="flex justify-center space-x-4 space-x-reverse">
              <button onClick={() => setStartPage(prev => prev === 1 ? 604 : prev - 1)} className="w-6 h-6 bg-red-400 rounded-full p-[1px]"><img src="https://maknoon.com/quran/back.svg" alt="" /></button>
              <span>{startPage}</span>
              <button onClick={() => setStartPage(prev => prev === 604 ? 1 : prev + 1)} className="w-6 h-6 bg-red-400 rounded-full p-[1px]"><img src="https://maknoon.com/quran/forward.svg" alt="" /></button>
            </div>
          </section>
      }
    </>
  );
};