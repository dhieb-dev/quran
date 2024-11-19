import { useContext, useEffect } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";
import { downlod } from "../svgs/download";
export function Surahs() {
  const { passRewayah, setPassAudio, setSearch, findedItem, setFindedItem } =
    useContext(Context);
  const url = `https://mp3quran.net/api/v3/suwar?language=ar`;
  const { data, loading, error } = useFetch(url);
  const surahs = passRewayah?.surahlist
    ?.split(",")
    .map((item) => data?.suwar.find((surah) => surah.id === +item));

  useEffect(() => {
    if (data) setSearch(surahs);
  }, [data, setSearch]);

  const clicked = (surah) => {
    setPassAudio({
      url: `${passRewayah.server}${String(surah.id).padStart(3, "0")}.mp3`,
      name: surah.name,
    });
  };

  useEffect(() => {
    if (findedItem === Object(findedItem)) clicked(findedItem);
    return () => setFindedItem();
  }, [findedItem]);

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
                click={() => clicked(surah)}
              />
              <a className="absolute left-4 h-full grid place-items-center"
                download
                href={`${passRewayah.server}${String(surah.id).padStart(
                  3,
                  "0"
                )}.mp3`}
              >
                {downlod.downlod}
              </a>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
