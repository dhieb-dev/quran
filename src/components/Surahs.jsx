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
