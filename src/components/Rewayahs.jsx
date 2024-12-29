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
  const [moshafId, setMoshafId] = useState();

  useEffect(() => {
    if (data) {
      setSearch(data.reciters[0].moshaf);
      if (findedItem) setMoshafId(findedItem);
      if (moshafId) {
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
    }
    return () => setFindedItem();
  }, [
    data,
    moshafId,
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
