import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/index";
import { ItemList, Spinner } from "./index";
import { Context } from "../context/Context";

export function Reciters() {
  const {
    setPassReciter,
    setSearch,
    setActiveComponent,
    findedItem,
    setFindedItem,
  } = useContext(Context);
  const { data, loading } = useFetch(
    `https://mp3quran.net/api/v3/reciters?language=ar`
  );
  const [reciterId, setReciterId] = useState();

  useEffect(() => {
    if (data) {
      setSearch(data.reciters);
      if (findedItem) setReciterId(findedItem);
      if (reciterId) {
        const reciter = data.reciters.find(
          (reciter) => reciter.id === reciterId
        );
        if (reciter) {
          setPassReciter({ id: reciter.id, name: reciter.name });
          setActiveComponent("rewayahs");
        }
      }
    }
    return () => setFindedItem();
  }, [
    data,
    reciterId,
    setPassReciter,
    setActiveComponent,
    setSearch,
    findedItem,
    setFindedItem,
  ]);

  return (
    <section className="reciters">
      {loading ? (
        <Spinner />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 animate-opacity">
          {data?.reciters?.map((reciter, index) => (
            <ItemList
              key={index}
              item={reciter}
              index={index}
              click={() => setReciterId(reciter.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
