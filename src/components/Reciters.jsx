import { useContext, useEffect } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";

export function Reciters({ setActiveComponent }) {
  const { setPassReciter, setSearch, findedItem, setFindedItem } =
    useContext(Context);
  const url = `https://mp3quran.net/api/v3/reciters?language=ar`;
  const { data, loading, error } = useFetch(url);
  const reciters = data?.reciters;

  useEffect(() => {
    if (data) setSearch(data.reciters);
  }, [data, setSearch]);

  const clicked = (reciter) => {
    setPassReciter({ id: reciter.id, name: reciter.name });
    setActiveComponent("rewayahs");
  };

  useEffect(() => {
    if (findedItem === Object(findedItem)) clicked(findedItem);
    return () => setFindedItem()
  }, [findedItem]);

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
              click={() => clicked(reciter)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
