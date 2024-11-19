import { useContext, useEffect } from "react";
import { Error, ItemList, Spinner } from "../components/index";
import { useFetch } from "../hooks/useFetch";
import { Context } from "../context/Context";

export const Radio = () => {
  const { setPassAudio, setSearch, findedItem, setFindedItem } =
    useContext(Context);
  const url = `https://mp3quran.net/api/v3/radios?language=ar`;
  const { data, loading, error } = useFetch(url);
  const radios = data?.radios;

  useEffect(() => {
    if (data) setSearch(data.radios);
  }, [data, setSearch]);

  const clicked = (radio) => {
    setPassAudio({ url: radio.url, name: radio.name });
  };

  useEffect(() => {
    if (findedItem === Object(findedItem)) clicked(findedItem);
    return () => setFindedItem()
  }, [findedItem]);

  return (
    <section>
      <div className="radios">
        {error ? (
          <Error />
        ) : loading ? (
          <Spinner className="spinner-radio" />
        ) : (
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {radios?.map((radio, index) => (
              <ItemList
                key={index}
                item={radio}
                index={index}
                click={() => clicked(radio)}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
