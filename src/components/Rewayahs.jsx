import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/index";
import { ItemList, Spinner } from "./index";
import { Context } from "../context/Context";

export function Rewayahs({ setActiveComponent }) {
  const { passReciter, setPassRewayah, setSearch, findedItem, setFindedItem } =
      useContext(Context),
    { data, loading } = useFetch(
      `https://mp3quran.net/api/v3/reciters?language=ar&reciter=${passReciter.id}`
    ),
    [moshafId, setMoshafId] = useState();

  useEffect(() => {
    if (data) setSearch(data.reciters[0].moshaf);
    return () => setSearch();
  }, [data, setSearch]);

  useEffect(() => {
    if (data) {
      const moshaf = data.reciters[0].moshaf.find(
        (moshaf) => moshaf.id === moshafId
      );
      if (moshaf) {
        setPassRewayah({
          surahlist: moshaf.surah_list,
          server: moshaf.server,
          name: moshaf.name,
        });
        setActiveComponent("surahs");
      }
    }
    return () => setMoshafId();
  }, [moshafId, setPassRewayah, setActiveComponent, data]);

  useEffect(() => {
    if (findedItem) setMoshafId(findedItem);
    return () => setFindedItem();
  }, [findedItem, setFindedItem]);

  return (
    <section className="rewayahs">
      {loading ? (
        <Spinner />
      ) : (
        <ul className="mt-2 space-y-4 animate-opacity">
          {data.reciters[0].moshaf.map((moshaf, index) => (
            <ItemList
              key={index}
              index={index}
              item={moshaf}
              click={() => setMoshafId(moshaf.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
