import { useContext, useEffect } from "react";
import { Error, ItemList, Spinner } from "../components/index";
import { useFetch } from "../hooks/useFetch";
import { Context } from "../context/Context";

export const Radio = () => {
  const { setPassAudio, setSearch, findByIndex, setFindByIndex } =
    useContext(Context);
  const url = `https://mp3quran.net/api/v3/radios?language=ar`;
  const { data, loading, error } = useFetch(url);
  const radios = data?.radios;

  useEffect(() => {
    if (data) setSearch(data.radios);
  }, [data, setSearch]);

  const clicked = (index) => {
    setPassAudio({ url: radios[index].url, name: radios[index].name });
  };

  useEffect(() => {
    setFindByIndex();
    if (!isNaN(findByIndex)) clicked(findByIndex);
  }, [findByIndex]);

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
                click={() => clicked(index)}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
