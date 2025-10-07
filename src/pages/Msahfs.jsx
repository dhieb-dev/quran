import { useState } from "react";
import { useFetch } from "../hooks";
import { DropDown } from "../layouts/DropDown";
import { Loading } from "../components";

export const Msahfs = () => {
  const [page, setPage] = useState(1);
  const [rewayah, setRewayah] = useState("hafs");
  const { data, loading } = useFetch("https://www.mp3quran.net/api/v3/suwar");

  const rewayat = [
    { name: "رواية حفص عن عاصم", path: "hafs" },
    { name: "رواية شعبة عن عاصم", path: "shubah" },
    { name: "رواية قالون عن نافع", path: "qalon" },
    { name: "رواية ورش عن نافع", path: "warsh" },
    { name: "روية دوري ابي عمرو", path: "douri" },
  ];

  if (loading) return <Loading />;

  return (
    <section className="masahfs">
      <div className="head pb-4 flex justify-around">
        <DropDown
          initialValue={data?.suwar[0].name}
          optionsArray={data?.suwar}
          optionTask={(option) => setPage(option.start_page)}
          width="w-40"
        />
        <DropDown
          initialValue={rewayat[0].name}
          optionsArray={rewayat}
          optionTask={(option) => setRewayah(option.path)}
          width="w-40"
        />
      </div>
      <div className="flex justify-center items-center md:space-x-2 md:space-x-reverse">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          className="max-md:absolute max-md:right-0 bg-slate-200 hover:bg-red-200 w-10 h-10 md:w-14 md:h-14 rounded-full grid place-content-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="size-4 lg:size-5 xl:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
            />
          </svg>
        </button>

        <img
          className="w-full md:w-3/4 lg:w-1/2 bg-slate-200 p-2 rounded"
          src={`https://maknoon.com/quran/${rewayah}/${page}.svgz`}
        />

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="max-md:absolute max-md:left-0 bg-slate-200 hover:bg-red-200 w-10 h-10 md:w-14 md:h-14 rounded-full grid place-content-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="size-4 lg:size-5 xl:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};
