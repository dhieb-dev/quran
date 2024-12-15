import { useEffect, useState } from "react";
import { Spinner } from "../components";
import { useFetch } from "../hooks";
import imageExists from "image-exists";

export const BrowseQuran = () => {
  const { data, loading } = useFetch(
      `https://mp3quran.net/api/v3/suwar?language=ar`
    ),
    [namesSuwar, setNamesSuwar] = useState([]),
    [startPage, setStartPage] = useState(1),
    [rewayah, setRewayah] = useState("hafs"),
    [src, setSrc] = useState(""),
    [exists, setExists] = useState(false);

  useEffect(() => {
    if (data) setNamesSuwar(data.suwar);
  }, [data, namesSuwar]);

  useEffect(() => {
    if (exists) setExists("");
    let getSrc = `https://maknoon.com/quran/${rewayah}/${startPage}.svgz`;
    imageExists(getSrc, (exists) => {
      if (exists) {
        setSrc(getSrc);
        setExists(true);
      }
    });
  }, [rewayah, startPage, exists]);

  const riwayat = [
    { name: "حفص عن عاصم", value: "hafs" },
    { name: "دوري عن أبي عمرو", value: "douri" },
    { name: "قالون عن نافع", value: "qalon" },
    { name: "شعبة عن عاصم", value: "shubah" },
    { name: "ورش عن نافع", value: "warsh" },
  ];

  return (
    <section className="browse-quran">
      {loading ? (
        <Spinner className="spinner-radio" />
      ) : (
        <>
          <div className="selects flex my-4">
            <select
              className="py-1 px-2 mx-2 cursor-pointer outline-none bg-slate-100 dark:bg-slate-800 border-2 border-slate-500/50  dark:border-zinc-200/50 rounded"
              onChange={(e) =>
                setStartPage(e.target.options[e.target.selectedIndex].value)
              }
            >
              {namesSuwar.map((surah) => (
                <option key={surah.id} value={surah.start_page}>
                  {surah.name}
                </option>
              ))}
            </select>
            <select
              className="py-1 px-2 mx-2 cursor-pointer outline-none bg-slate-100 dark:bg-slate-800 border-2 border-slate-500/50  dark:border-zinc-200/50 rounded"
              onChange={(e) =>
                setRewayah(e.target.options[e.target.selectedIndex].value)
              }
            >
              {riwayat.map((rewayah, index) => (
                <option key={index} value={rewayah.value}>
                  {rewayah.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={() => {
                setStartPage((prev) => (prev === 1 ? 604 : prev - 1));
              }}
              className="my-auto mx-2 w-6 h-8 bg-blue-300 rounded"
            >
              <img src="https://maknoon.com/quran/back.svg" alt="" />
            </button>
            <div className="relative min-h-[800px] w-[90%] md:w-[600px]  p-1 bg-slate-100 rounded overflow-hidden">
              {exists ? (
                <img className="w-full" src={src} alt="page" />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full bg-slate-300/70 grid place-content-center">
                  <span className="w-16 h-16 bg-gray-600 rounded-full animate-ping"></span>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setStartPage((prev) => (prev === 604 ? 1 : prev + 1));
              }}
              className="my-auto mx-2 w-6 h-8 bg-blue-300 rounded"
            >
              <img src="https://maknoon.com/quran/forward.svg" alt="" />
            </button>
          </div>
        </>
      )}
    </section>
  );
};
