import { useContext, useEffect } from "react";
import { useFetch } from "../hooks/index";
import { Error, ItemList, Spinner } from "./index";
import { Context } from "../context/Context";

export function Reciters({ setActiveComponent }) {
  const { setPassReciter, setSearch } = useContext(Context);
  const url = `https://mp3quran.net/api/v3/reciters?language=ar`;
  const { data, loading, error } = useFetch(url);
  const reciters = data?.reciters;

  useEffect(() => {
    if (data) setSearch(data.reciters);
  }, [data, setSearch]);

  const clicked = (index) => {
    setPassReciter({ id: reciters[index].id, name: reciters[index].name });
    setActiveComponent("rewayahs");
  };

  return (
    <div className="reciters">
      {error ? (
        <Error />
      ) : loading ? (
        <Spinner />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reciters.map((reciter, index) => (
            <ItemList
              key={index}
              item={reciter}
              index={index}
              click={() => clicked(index)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
