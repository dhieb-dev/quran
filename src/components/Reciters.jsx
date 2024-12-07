import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";

export function Reciters({ setActiveComponent }) {
  const { setPassReciter, setSearch, findedItem, setFindedItem } = useContext(Context);
  const url = `https://mp3quran.net/api/v3/reciters?language=ar`;
  const { data, loading, error } = useFetch(url);
  const [reciters, setReciters] = useState();
  const [reciterId, setReciterId] = useState();

  useEffect(() => {
    if (data) setReciters(data.reciters);
  }, [data, reciters]);

  useEffect(() => {
    if (reciters) setSearch(reciters);
    return () => setSearch();
  }, [reciters, setSearch]);

  useEffect(() => {
    if (reciters) {
      const reciter = reciters.find((reciter) => reciter.id === reciterId);
      if (reciter) {
        setPassReciter({ id: reciter.id, name: reciter.name });
        setActiveComponent("rewayahs");
      }
    }
    return () => setReciterId();
  }, [reciterId, setPassReciter, setActiveComponent, reciters]);

  useEffect(() => {
    if (findedItem) setReciterId(findedItem);
    return () => setFindedItem()
  }, [findedItem, setFindedItem]);

  return (
    <div className="reciters">
      {error ? (
        <Error />
      ) : loading ? (
        <Spinner />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {reciters?.map((reciter, index) => (
            <ItemList
              key={index}
              item={reciter}
              index={index}
              click={() => setReciterId(reciter.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
