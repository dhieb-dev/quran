import { useContext, useEffect, useState, useTransition } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";

export function Rewayahs() {
  const {
    passReciter,
    setPassRewayah,
    setActiveComponent,
    setSearch,
    findedItem,
    setFindedItem,
  } = useContext(Context);
  const { data, loading, error } = useFetch(
    `https://mp3quran.net/api/v3/reciters?language=ar&reciter=${passReciter.id}`
  );
  const [id, setId] = useState();
  const [moshafs, setMoshaf] = useState([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (data) startTransition(() => setMoshaf(data?.reciters[0].moshaf));
  }, [data]);

  useEffect(() => {
    if (moshafs) setSearch(moshafs);
    return () => setSearch();
  }, [setSearch, moshafs]);

  useEffect(() => {
    if (findedItem) setId(findedItem);
    return () => setFindedItem();
  }, [findedItem, setFindedItem]);

  useEffect(() => {
    if (moshafs) {
      const moshaf = moshafs.find((moshaf) => moshaf.id === id);
      if (moshaf) {
        setPassRewayah(moshaf);
        setActiveComponent("surahs");
      }
    }
  }, [moshafs, id, setPassRewayah, setActiveComponent]);

  return (
    <section className="rewayahs">
      {loading || isPending ? (
        <Spinner />
      ) : error ? (
        <Error />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 animate-opacity">
          {moshafs.map((moshaf, index) => (
            <ItemList
              key={index}
              index={index}
              item={moshaf}
              click={() => setId(moshaf.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
