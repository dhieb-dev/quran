import { useContext, useEffect, useState } from "react";
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
  const moshafs = data?.reciters[0].moshaf;
  useEffect(() => {
    if (moshafs) {
      setSearch(moshafs);
      if (findedItem) setMoshafIndex(findedItem);
      if (moshafIndex) {
        setPassRewayah({
          surahlist: moshafs[moshafIndex].surah_list,
          server: moshafs[moshafIndex].server,
          name: moshafs[moshafIndex].name,
        });
        setActiveComponent("surahs");
      }
    }
    return () => setFindedItem();
  }, [
    moshafs,
    moshafIndex,
    setPassRewayah,
    setActiveComponent,
    findedItem,
    setSearch,
    setFindedItem,
  ]);

  return (
    <section className="rewayahs">
      {loading ? (
        <Spinner />
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
