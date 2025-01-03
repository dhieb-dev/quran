import { useContext, useEffect, useState, useTransition } from "react";
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
  const [reciters, setReciters] = useState([]);
  const [id, setId] = useState();
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (data) startTransition(() => setReciters(data.reciters));
  }, [data]);

  useEffect(() => {
    if (reciters) setSearch(reciters);
    return () => setSearch();
  }, [setSearch, reciters]);

  useEffect(() => {
    if (findedItem) setId(findedItem);
    return () => setFindedItem();
  }, [findedItem, setFindedItem]);

  useEffect(() => {
    if (reciters) {
      const reciter = reciters.find((reciter) => reciter.id === id);
      if (reciter) {
        setPassReciter(reciter);
        setActiveComponent("rewayahs");
      }
    }
  }, [reciters, id, setPassReciter, setActiveComponent]);

  return (
    <section className="reciters">
      {(loading || isPending) ? (
        <Spinner />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 animate-opacity">
          {reciters.map((reciter, index) => (
            <ItemList
              key={index}
              item={reciter}
              index={index}
              click={() => setId(reciter.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
