import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";
import { downlod } from "../svgs/download";
export function Surahs() {
  const {
    passRewayah,
    setPassAudio,
    saveAllAudios,
    setSaveAllAudios,
    setSearch,
    findedItem,
    setFindedItem,
    setNextOrPrev,
  } = useContext(Context);
  const url = `https://mp3quran.net/api/v3/suwar?language=ar`;
  const { data, loading, error } = useFetch(url);
  const [surahs, setSurahs] = useState();
  const [index, setIndex] = useState();
  const [id, setId] = useState();
  const [progress, setProgress] = useState(0);
  const [download, setDownload] = useState(false);

  // Filter Array Surahs In Data
  useEffect(() => {
    if (data && passRewayah) {
      const surahs = data.suwar;
      const moshafList = passRewayah.surahlist;
      setSurahs(
        moshafList
          .split(",")
          .map((item) => surahs.find((surah) => surah.id === +item))
      );
      if (surahs) {
        setSaveAllAudios(
          surahs.map((surah, index) => ({
            index,
            id: surah.id,
            url: `${passRewayah.server}${String(surah.id).padStart(
              3,
              "0"
            )}.mp3`,
            name: surah.name,
          }))
        );
      }
    }
    return () => setSurahs();
  }, [data, passRewayah, setSaveAllAudios]);

  // Set Array Search
  useEffect(() => {
    if (surahs) setSearch(surahs);
    return () => setSearch();
  }, [surahs, setSearch]);

  useEffect(() => {
    if (surahs) {
      const rewayah = passRewayah?.server;
      const surah = surahs.find((surah) => surah.id === id);
      if (surah) {
        setPassAudio({
          url: `${rewayah}${String(surah.id).padStart(3, "0")}.mp3`,
          name: surah.name,
        });
      }
    }
    return () => setId();
  }, [passRewayah, setPassAudio, surahs, id]);

  useEffect(() => {
    if (findedItem) {
      const findSurah = saveAllAudios.find((audio) => audio.id === findedItem);
      setNextOrPrev(findSurah.index);
      setId(findedItem);
    }
    return () => setFindedItem();
  }, [saveAllAudios, setFindedItem, findedItem, setNextOrPrev, id]);

  useEffect(() => {
    if (index >= 0) setNextOrPrev(index);
  }, [setNextOrPrev, index]);

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
    <div className="suwar">
      {download && (
        <div className="mb-1 download w-1/2 mx-auto flex items-center gap-2">
          <div className="bg-slate-400 dark:bg-neutral-700 bottom-4 w-full h-2 rounded">
            <div
              style={{ width: `${progress.toFixed(2)}%` }}
              className="bg-red-400 dark:bg-sky-700 w-40 h-2 rounded "
            ></div>
          </div>
          <div className="text-xs">{progress.toFixed(1)}%</div>
        </div>
      )}
      {error ? (
        <Error />
      ) : loading ? (
        <Spinner />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {surahs?.map((surah, index) => (
            <div key={index} className="relative flex">
              <ItemList
                item={surah}
                index={surah.id - 1}
                click={() => {
                  setIndex(index);
                  setId(surah.id);
                }}
              />
              <button
                className="absolute left-4 h-full grid place-items-center"
                onClick={() =>
                  handleDownload(
                    `${passRewayah.server}${String(surah.id).padStart(
                      3,
                      "0"
                    )}.mp3`,
                    `${String(surah.id).padStart(3, "0")}.mp3`
                  )
                }
              >
                {downlod.downlod}
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
