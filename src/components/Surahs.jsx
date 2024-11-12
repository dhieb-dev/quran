import { useContext, useEffect } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";

export function Surahs() {
  const { passRewayah, setPassAudio, setSearch } = useContext(Context);
  const url = `https://mp3quran.net/api/v3/suwar?language=ar`;
  const { data, loading, error } = useFetch(url);
  const surahs = passRewayah.surahlist
    .split(",")
    .map((item) => data?.suwar.find((surah) => surah.id === +item));

  useEffect(() => {
    if (data) setSearch(surahs);
  }, [data, setSearch]);

  const clicked = (index) => {
    setPassAudio({
      url: `${passRewayah.server}${String(surahs[index].id).padStart(
        3,
        "0"
      )}.mp3`,
      name: surahs[index].name,
    });
  };

  return (
    <div className="suwar">
      {error ? (
        <Error />
      ) : loading ? (
        <Spinner />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {surahs.map((surah, index) => (
            <ItemList
              key={index}
              item={surah}
              index={surah.id - 1}
              click={() => clicked(index)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
