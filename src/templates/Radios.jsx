import { useFetch } from "../hooks/index";
import { ListItem, Loading } from "../components/index";
import { useContext, useEffect } from "react";
import Context from "../context/Context";

export const Radios = () => {
  const { data, loading } = useFetch("radios");
  const { setAudioIndex, setAudioList } = useContext(Context);
  useEffect(() => {
    if (data) {
      const radios = data.radios.map((radio) => [radio.name, radio.url]);
      setAudioList(radios);
    }
  }, [data, setAudioList]);

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 setNameReciter">
          {data?.radios.map((radio, index) => (
            <ListItem
              handleClick={() => setAudioIndex(index)}
              key={radio.id}
              name={radio.name}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
};
