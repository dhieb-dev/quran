import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/index";
import { saveAs } from "file-saver";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";
import { downlod } from "../svgs/download";
export function Surahs() {
  const { passRewayah, setPassAudio, setSaveAllAudios, setSearch, findedItem } =
    useContext(Context);
  const url = `https://mp3quran.net/api/v3/suwar?language=ar`;
  const { data, loading, error } = useFetch(url);
  const [surahs, setSurahs] = useState();
  const [surahId, setSurahId] = useState();

  useEffect(() => {
     setPassAudio()
    if (data && passRewayah)
      setSurahs(
        passRewayah.surahlist
          ?.split(",")
          .map((item) => data.suwar.find((surah) => surah.id === +item))
      );
  }, [data, passRewayah, setPassAudio]);

  useEffect(() => {
    if (surahs) setSearch(surahs);
    return () => setSearch();
  }, [surahs, setSearch]);

  useEffect(() => {
    if (surahs && passRewayah) {
      const surah = surahs?.find((surah) => surah.id === surahId);
      const surahsInfo = surahs.map((surah) => ({
        id: surah.id,
        url: `${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3`,
        name: surah.name,
      }));
      setSaveAllAudios(surahsInfo);
      if (surah) {
        setPassAudio({
          id: surah.id,
          url: `${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3`,
          name: surah.name,
        });
      }
    }
    return () => setSurahId();
  }, [surahId, setPassAudio, surahs, passRewayah, setSaveAllAudios]);

  useEffect(() => {
    if (findedItem) setSurahId(findedItem);
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
                click={() => setSurahId(surah.id)}
              />
              <button
                className="absolute left-4 h-full grid place-items-center"
                onClick={() =>
                  handleDownload(
                    `${passRewayah.server}${String(surah.id - 1).padStart(
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
