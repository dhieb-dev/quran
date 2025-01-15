import { useEffect, useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { Spinner } from "../components";
import { arrows } from "../svgs/arrows";
export const BrowseQuran = () => {
  const [page, setPage] = useState(null);
  const [numPage, setNumPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cachedPages = useRef({}); // لتخزين الصفحات المحملة مسبقًا

  useEffect(() => {
    const getPage = async () => {
      setIsLoading(true);
      setError(null);
      if (cachedPages.current[numPage]) {
        setPage(cachedPages.current[numPage]);
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `https://www.mp3quran.net/api/quran_pages_svg/dark/${String(
            numPage
          ).padStart(3, "0")}.svg`
        );
        if (!res.ok) throw new Error("Failed to load page");
        const data = await res.text();
        cachedPages.current[numPage] = data;
        setPage(data);
      } catch (err) {
        setError("حدث خطأ أثناء تحميل الصفحة.");
      } finally {
        setIsLoading(false);
      }
    };
    getPage();
  }, [numPage]);
  const contentRef = useRef();
  const handlers = useSwipeable({
    onSwipedLeft: () => setNumPage((prev) => (prev === 1 ? 604 : prev - 1)),
    onSwipedRight: () => setNumPage((prev) => (prev === 604 ? 1 : prev + 1)),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <section className="browse-quran" {...handlers}>
      {isLoading ? (
        <Spinner className="spinner-radio" />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="flex justify-center items-center">
          <button
            onClick={() => setNumPage((prev) => (prev === 1 ? 604 : prev - 1))}
            className="p-2 mx-1.5 bg-fourth rounded"
            disabled={isLoading}
          >
            {arrows.left}
          </button>

          <div
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: page }}
            className="w-full h-[840px] sm:w-11/12 md:w-10/12 md:h-[960px] lg:w-3/5 lg:h-[925px] xl:w-1/2 xl:h-[830px] overflow-hidden rounded-md bg-primary [&_svg]:h-full [&_svg]:w-full [&_svg_#content_g_path]:fill-secondary [&_svg_rect]:fill-transparent"
          ></div>

          <button
            onClick={() => setNumPage((prev) => (prev === 604 ? 1 : prev + 1))}
            className="p-2 mx-1.5 bg-fourth rounded"
            disabled={isLoading}
          >
            {arrows.right}
          </button>
        </div>
      )}
    </section>
  );
};
