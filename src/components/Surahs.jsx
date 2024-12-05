import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/index";
import { saveAs } from "file-saver";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";
import { downlod } from "../svgs/download";
export function Surahs() {
  const {
    passRewayah,
    setPassAudio,
    setSaveAllAudios,
    setSearch,
    findedItem,
    setNextOrPrev,
  } = useContext(Context);
  const url = `https://mp3quran.net/api/v3/suwar?language=ar`;
  const { data, loading, error } = useFetch(url);
  const [surahs, setSurahs] = useState();
  const [index, setIndex] = useState();
  const [id, setId] = useState();

  // Filter Array Surahs In Data
  useEffect(() => {
    if (data) {
      const filterSurahs = passRewayah.surahlist
        ?.split(",")
        .map((item) => data.suwar.find((surah) => surah.id === +item));
      setSurahs(filterSurahs);
    }
  }, [data, passRewayah]);

  // Set Array Search
  useEffect(() => {
    if (surahs) setSearch(surahs);
    return () => setSearch();
  }, [surahs, setSearch]);

  // Save Object of each surah in an array
  useEffect(() => {
    if (surahs) {
      const ArrAllSurahs = surahs.map((surah) => ({
        url: `${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3`,
        name: surah.name,
      }));
      setSaveAllAudios(ArrAllSurahs);
    }
  }, [passRewayah, surahs, setSaveAllAudios]);

  useEffect(() => {
    if (id && surahs && passRewayah) {
      const rewayah = passRewayah?.server;
      const surah = surahs.find((surah) => surah.id === id);
      setPassAudio({
        url: `${rewayah}${String(surah.id).padStart(3, "0")}.mp3`,
        name: surah.name,
      });
    }
  }, [passRewayah, setPassAudio, surahs, id, setNextOrPrev, index]);

  useEffect(() => {
    if (findedItem) {
      setId(findedItem.id);
      setNextOrPrev(findedItem.index);
    }
  }, [findedItem, setNextOrPrev]);

  useEffect(() => {
    if (index >= 0) setNextOrPrev(index);
  }, [setNextOrPrev, index]);

  const handleDownload = (url, name) => {
    saveAs(url, name);
  };

  return (
    <div className="suwar">
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
