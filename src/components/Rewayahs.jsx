import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/index";
import { ItemList, Spinner } from "./index";
import { Context } from "../context/Context";

export function Rewayahs({ setActiveComponent }) {
  const { passReciter, setPassRewayah, setSearch, findedItem, setFindedItem } =
    useContext(Context);
  const url = `https://mp3quran.net/api/v3/reciters?language=ar&reciter=${passReciter.id}`;
  const { data, loading } = useFetch(url);
  const [moshafs, setMoshafs] = useState();
  const [moshafId, setMoshafId] = useState();

  useEffect(() => {
    if (data) setMoshafs(data.reciters[0].moshaf);
  }, [data, moshafs]);

  useEffect(() => {
    if (moshafs) setSearch(moshafs);
    return () => setSearch();
  }, [moshafs, setSearch]);

  useEffect(() => {
    if (moshafs) {
      const moshaf = moshafs.find((moshaf) => moshaf.id === moshafId);
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
  }, [moshafId, setPassRewayah, setActiveComponent, moshafs]);

  useEffect(() => {
    if (findedItem) setMoshafId(findedItem);
    return () => setFindedItem();
  }, [findedItem, setFindedItem]);

  return (
    <section className="rewayahs">
      {loading ? (
        <Spinner />
      ) : (
        <ul className="mt-3">
          {moshafs?.map((moshaf, index) => (
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
