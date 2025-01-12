import { useEffect, useRef, useState } from "react";
import { Spinner } from "../components";
import { arrows } from "../svgs/arrows";

export const BrowseQuran = () => {
  const [page, setPage] = useState();
  const [numPage, setNumPage] = useState(1);
  const contentRef = useRef(null);
  useEffect(() => {
    const getPage = async () => {
      const res = await fetch(
        `https://www.mp3quran.net/api/quran_pages_svg/dark/${String(
          numPage
        ).padStart(3, "0")}.svg`
      );
      const data = await res.text();
      if (contentRef) contentRef.current.innerHTML = data;
    };
    getPage();
  }, [numPage, contentRef]);

  return (
    <section className="browse-quran">
      {false ? (
        <Spinner className="spinner-radio" />
      ) : (
        <>
          <div className="flex justify-center">
            <button
              onClick={() => {
                setNumPage((prev) => (prev === 1 ? 604 : prev - 1));
              }}
              className="p-2 mx-1.5 bg-fourth rounded"
            >
              {arrows.left}
            </button>
            <div ref={contentRef}
              className="w-1/2 h-[870px]"
            ></div>
            <button
              onClick={() => {
                setNumPage((prev) => (prev === 604 ? 1 : prev + 1));
              }}
              className="p-2 mx-1.5 bg-fourth rounded"
            >
              {arrows.right}
            </button>
          </div>
        </>
      )}
    </section>
  );
};
