import { useFetch } from "../hooks/index";
import { ListItem, Loading, Search } from "../components/index";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

export const Radios = () => {
  const { data, loading } = useFetch("https://www.mp3quran.net/api/v3/radios");
  const { setAudioIndex, setAudioList } = useContext(Context);
  const [radiosArr, setRadiosArr] = useState([]);
  const [result, setResult] = useState();

  useEffect(() => {
    if (data) {
      const radios = data.radios.map((radio) => [radio.name, radio.url]);
      setRadiosArr(data.radios);
      setAudioList(radios);
    }
    if (result) setRadiosArr(result);
  }, [data, setAudioList, result]);

  if (loading) return <Loading />;

  return (
    <section>
      <div className="flex justify-between items-center">
        <Search getSearchArr={radiosArr} setResult={setResult} />
        <p>{radiosArr.length <= 0 ? "لا يوجد" : radiosArr.length} إذاعة</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 animate-softVision">
        {radiosArr.map((radio, index) => (
          <ListItem
            handleClick={() => setAudioIndex(index)}
            key={radio.id}
            name={radio.name.replaceAll("---", "").replaceAll("***", "")}
            index={index + 1}
          />
        ))}
      </div>
    </section>
  );
};
