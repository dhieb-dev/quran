import { useContext, useEffect } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";

export function Rewayahs({ setActiveComponent }) {
  const {
    passReciter,
    setPassRewayah,
    setSearch,
    findByIndex,
    setFindByIndex,
  } = useContext(Context);
  const url = `https://mp3quran.net/api/v3/reciters?language=ar&reciter=${passReciter.id}`;
  const { data, loading, error } = useFetch(url);
  const rewayahs = data?.reciters[0].moshaf;

  useEffect(() => {
    if (data) setSearch(data.reciters[0].moshaf);
  }, [data, setSearch]);

  const clicked = (index) => {
    setPassRewayah({
      surahlist: rewayahs[index].surah_list,
      server: rewayahs[index].server,
      name: rewayahs[index].name,
    });
    setActiveComponent("surahs");
  };

  useEffect(() => {
    setFindByIndex();
    if (!isNaN(findByIndex)) clicked(findByIndex);
  }, [findByIndex]);

  return (
    <div className="rewayahs">
      {error ? (
        <Error />
      ) : loading ? (
        <Spinner />
      ) : (
        <ul>
          {rewayahs.map((moshaf, index) => (
            <ItemList
              key={index}
              index={index}
              item={moshaf}
              click={() => clicked(index)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
