import { useContext, useEffect } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";

export function Rewayahs({ setActiveComponent }) {
  const { passReciter, setPassRewayah, setSearch, findedItem, setFindedItem } =
    useContext(Context);
  const url = `https://mp3quran.net/api/v3/reciters?language=ar&reciter=${passReciter.id}`;
  const { data, loading, error } = useFetch(url);
  const rewayahs = data?.reciters[0].moshaf;

  useEffect(() => {
    if (data) setSearch(data.reciters[0].moshaf);
  }, [data, setSearch]);

  const clicked = (moshaf) => {
    setPassRewayah({
      surahlist: moshaf.surah_list,
      server: moshaf.server,
      name: moshaf.name,
    });
    setActiveComponent("surahs");
  };

  useEffect(() => {
    if (findedItem === Object(findedItem)) clicked(findedItem);
    return () => setFindedItem();
  }, [findedItem]);

  return (
    <div className="rewayahs">
      {error ? (
        <Error />
      ) : loading ? (
        <Spinner />
      ) : (
        <ul className="mt-2">
          {rewayahs?.map((moshaf, index) => (
            <ItemList
              key={index}
              index={index}
              item={moshaf}
              click={() => clicked(moshaf)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
