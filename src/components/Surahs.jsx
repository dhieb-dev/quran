import { useContext, useEffect, useState, useTransition } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";
export function Surahs() {
  const {
      passRewayah,
      setPassAudio,
      setSaveAllAudios,
      setSearch,
      findedItem,
      setFindedItem,
      setNextOrPrev,
    } = useContext(Context),
    { data, loading, error } = useFetch(
      `https://mp3quran.net/api/v3/suwar?language=ar`
    ),
    [surahs, setSurahs] = useState([]),
    [id, setId] = useState(),
    [progress, setProgress] = useState(0),
    [download, setDownload] = useState(false);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (data && passRewayah) {
      const surahsList = passRewayah.surah_list
        .split(",")
        .map((item) => data.suwar.find((surah) => surah.id === +item))
        .map((surah, index) => ({
          index,
          id: surah.id,
          url: `${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3`,
          name: surah.name,
        }));
      startTransition(() => setSurahs(surahsList));
    }
  }, [data, passRewayah]);

  useEffect(() => {
    if (surahs) setSearch(surahs);
    return () => setSearch();
  }, [setSearch, surahs]);

  useEffect(() => {
    if (id) {
      setSaveAllAudios(surahs);
    }
  }, [id, setSaveAllAudios, surahs]);

  useEffect(() => {
    if (surahs && id) {
      const surah = surahs.find((surah) => surah.id === id);
      if (surah) {
        setPassAudio({
          url: `${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3`,
          name: surah.name,
        });
      }
    }
    return () => setId();
  }, [passRewayah, setPassAudio, surahs, id]);

  useEffect(() => {
    if (findedItem) {
      const findSurah = surahs.find((audio) => audio.id === findedItem);
      setNextOrPrev(findSurah.index);
      setId(findedItem);
    }
    return () => setFindedItem();
  }, [surahs, setFindedItem, setNextOrPrev, findedItem, id]);

  const getIndex = (i) => setNextOrPrev(i);

  const handleDownload = async (url, name) => {
    const res = await fetch(url);
    if (!res?.body) return;
    const reader = res.body.getReader();
    const chunks = [];
    const contentLength = res.headers.get("Content-Length");
    const totalLength =
      typeof contentLength === "string" && parseInt(contentLength);
    let recievedLength = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      recievedLength = recievedLength + value.length;
      if (typeof totalLength === "number") {
        const step =
          parseFloat((recievedLength / totalLength).toFixed(2)) * 100;
        setDownload(true);
        setProgress(step);
      }
      chunks.push(value);
    }
    const blob = new Blob(chunks);
    const getUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = getUrl;
    a.download = name;
    function handleOnDownload() {
      setTimeout(() => {
        URL.revokeObjectURL(getUrl);
        a.removeEventListener("click", handleOnDownload);
      }, 150);
    }
    a.addEventListener("click", handleOnDownload);
    a.click();
    if (progress <= 100) {
      setDownload(false);
    }
  };

  return (
    <section className="suwar">
      {download && (
        <div className="fixed z-10 top-7 left-[20%] min-w-[30%] flex items-center">
          <div className="bg-slate-400 dark:bg-neutral-700 bottom-4 w-full h-2 rounded">
            <div
              style={{ width: `${progress.toFixed(2)}%` }}
              className="bg-red-400 dark:bg-sky-700 w-40 h-2 rounded "
            ></div>
          </div>
          <div className="text-xs mx-2">{progress.toFixed(0)}%</div>
        </div>
      )}
      {loading || isPending ? (
        <Spinner />
      ) : error ? (
        <Error />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 animate-opacity">
          {surahs.map((surah, index) => (
            <ItemList
              key={index}
              item={surah}
              index={surah.id - 1}
              click={() => {
                setId(surah.id);
                getIndex(index);
              }}
              download={() => {
                handleDownload(
                  `${passRewayah.server}${String(surah.id).padStart(
                    3,
                    "0"
                  )}.mp3`,
                  `${String(surah.id).padStart(3, "0")}.mp3`
                );
              }}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
