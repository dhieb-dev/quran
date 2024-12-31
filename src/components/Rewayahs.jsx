import { useContext, useEffect, useState, useTransition } from "react";
import { useFetch } from "../hooks/index";
import { ItemList, Spinner } from "./index";
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
  const { data, loading } = useFetch(
    `https://mp3quran.net/api/v3/reciters?language=ar&reciter=${passReciter.id}`
  );
  const [moshafIndex, setMoshafIndex] = useState();
  const [moshafs, setMoshaf] = useState([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (data) {
      startTransition(() => setMoshaf(data?.reciters[0].moshaf));
      setSearch(data?.reciters[0].moshaf);
    }
  }, [data, setSearch]);

  useEffect(() => {
    if (findedItem) setMoshafIndex(findedItem);
    return () => setFindedItem();
  }, [findedItem, setFindedItem]);

  useEffect(() => {
    if (moshafIndex) {
      setPassRewayah({
        surahlist: moshafs[moshafIndex].surah_list,
        server: moshafs[moshafIndex].server,
        name: moshafs[moshafIndex].name,
      });
      setActiveComponent("surahs");
    }
  }, [moshafs, moshafIndex, setPassRewayah, setActiveComponent]);

  return (
    <section className="rewayahs">
      {loading ? (
        <Spinner />
      ) : isPending ? (
        <p>Please Wait...</p>
      ) : (
        <ul className="mt-2 space-y-4 animate-opacity">
          {moshafs.map((moshaf, index) => (
            <ItemList
              key={index}
              index={index}
              item={moshaf}
              click={() => setMoshafIndex(index)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
