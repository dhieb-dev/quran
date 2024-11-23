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
  } = useContext(Context);
  const url = `https://mp3quran.net/api/v3/radios?language=ar`;
  const { data, loading, error } = useFetch(url);
  const [radioId, setRadioId] = useState();
  const [radios, setRadios] = useState();

  useEffect(() => {
    if (data) setRadios(data.radios);
  }, [data, radios]);

  useEffect(() => {
    if (radios) setSearch(radios);
    return () => setSearch();
  }, [radios, setSearch]);

  useEffect(() => {
    if (radios) {
      const radio = radios?.find((radio) => radio.id === radioId);
      setSaveAllAudios(radios);
      if (radio) {
        setPassAudio({
          id: radio.id,
          url: radio.url,
          name: radio.name
        });
      }
    }
  }, [radioId, radios,  setPassAudio, setSaveAllAudios]);

  useEffect(() => {
    if (findedItem) setRadioId(findedItem);
  }, [findedItem]);

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
                click={() => setRadioId(radio.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
