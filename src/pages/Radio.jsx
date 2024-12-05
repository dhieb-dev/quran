import { useContext, useEffect, useState } from "react";
import { Error, ItemList, Spinner } from "../components/index";
import { useFetch } from "../hooks/useFetch";
import { Context } from "../context/Context";

export const Radio = () => {
  const {
    setSaveAllAudios,
    setPassAudio,
    setSearch,
    findedItem,
    setNextOrPrev,
  } = useContext(Context);
  const url = `https://mp3quran.net/api/v3/radios?language=ar`;
  const { data, loading, error } = useFetch(url);
  const [Id, setId] = useState();
  const [radios, setRadios] = useState();
  const [index, setIndex] = useState();

  useEffect(() => {
    if (data) setRadios(data.radios);
  }, [data, radios]);

  useEffect(() => {
    if (radios) setSearch(radios);
    return () => setSearch();
  }, [radios, setSearch]);

  useEffect(() => {
    if (radios) {
      const radio = radios?.find((radio) => radio.id === Id);
      setSaveAllAudios(radios);
      if (radio) {
        setPassAudio({
          id: radios[Id].id,
          url: radios[Id].url,
          name: radios[Id].name,
        });
      }
    }
  }, [Id, radios, setNextOrPrev, setPassAudio, setSaveAllAudios]);

  useEffect(() => {
    if (findedItem) {
      setId(findedItem.id);
      setNextOrPrev(findedItem.index);
    }
  }, [findedItem, setNextOrPrev]);

  useEffect(() => {
    if (index >= 0) setNextOrPrev(index);
  }, [setNextOrPrev, index]);

  return (
    <section>
      <div className="radios">
        {error ? (
          <Error />
        ) : loading ? (
          <Spinner className="spinner-radio" />
        ) : (
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {radios?.map((radio, index) => (
              <ItemList
                key={index}
                item={radio}
                index={index}
                click={() => {
                  setId(radio.id);
                  setIndex(index);
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
