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
  const [surahId, setSurahId] = useState();
  // const [surahId, setSurahId] = useState();

  useEffect(() => {
    if (data)
      setSurahs(
        passRewayah.surahlist
          ?.split(",")
          .map((item) => data.suwar.find((surah) => surah.id === +item))
      );
  }, [data, passRewayah]);

  useEffect(() => {
    if (surahs) setSearch(surahs);
    return () => setSearch();
  }, [surahs, setSearch]);

  useEffect(() => {
    if (surahs) {
      setSaveAllAudios(
        surahs.map((surah) => ({
          id: surah.id,
          url: `${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3`,
          name: surah.name,
        }))
      );
    }
  }, [passRewayah, surahs, setSaveAllAudios]);

  useEffect(() => {
    if (surahId >= 0)
      setPassAudio({
        id: data.suwar[surahId].id,
        url: `${passRewayah.server}${String(data.suwar[surahId].id).padStart(
          3,
          "0"
        )}.mp3`,
        name: data.suwar[surahId].name,
      });
    setNextOrPrev(surahId);
  }, [surahId, setNextOrPrev, passRewayah, setPassAudio, data]);

  useEffect(() => {
    if (findedItem >= 0) setSurahId(findedItem - 1);
  }, [findedItem]);

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
                click={() => setSurahId(surah.id - 1)}
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
