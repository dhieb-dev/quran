import { useFetch } from "../hooks/index";
import { ListItem, Loading, Search } from "../components/index";
import { useContext, useEffect, useState } from "react";
import { AudiosContext } from "../context/index";

export const Radios = () => {
  const { data, loading } = useFetch("https://www.mp3quran.net/api/v3/radios");
  const { setAudioIndex, setAudioList } = useContext(AudiosContext);
  const [radiosArr, setRadiosArr] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    if (result) return setRadiosArr(result);
    if (data) {
      setRadiosArr(data.radios);
      setAudioList(data.radios.map((radio) => [radio.name, radio.url]));
    }
  }, [data, setAudioList, result]);

  if (loading) return <Loading />;

  return (
    <section>
      <div className="flex justify-between items-center">
        <Search getSearchArr={radiosArr} setResult={setResult} />
        <p>{radiosArr.length <= 0 ? "لا يوجد" : radiosArr.length} إذاعة</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 animate-softVision">
        {radiosArr?.map((radio, index) => (
          <ListItem
            handleClick={() => setAudioIndex(index)}
            key={radio.id}
            name={radio.name
              .replace("---", "")
              .replace("---", "")
              .replace("***", "")
              .replace("***", "")}
            index={index + 1}
          />
        ))}
      </div>
    </section>
  );
};
