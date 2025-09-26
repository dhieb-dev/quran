import { useFetch } from "../hooks/index";
import { ListItem, Loading, Search } from "../components/index";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

export const Reciters = ({ setNameReciter }) => {
  const { setReciterData } = useContext(Context);
  const { data, loading } = useFetch(
    "https://www.mp3quran.net/api/v3/reciters"
  );
  const [recitersArr, setRecitersArr] = useState([]);
  const [result, setResult] = useState();
  useEffect(() => {
    if (data) {
      setRecitersArr(data.reciters);
      if (result) setRecitersArr(result);
    }
  }, [data, result]);

  const handleClick = (name, moshaf) => {
    setReciterData({ moshaf });
    setNameReciter(name);
  };

  if (loading) return <Loading />;

  return (
    <section>
      <div className="flex justify-between items-center">
        <Search getSearchArr={data.reciters} setResult={setResult} />
        <p>{recitersArr.length <= 0 ? "لا يوجد" : recitersArr.length} قارئ</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 animate-softVision">
        {recitersArr.map((reciter, index) => (
          <ListItem
            handleClick={() => handleClick(reciter.name, reciter.moshaf)}
            key={reciter.id}
            name={reciter.name}
            index={index + 1}
          />
        ))}
      </div>
    </section>
  );
};
